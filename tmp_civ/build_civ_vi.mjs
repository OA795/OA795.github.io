import fs from "node:fs/promises";
import { Presentation, PresentationFile } from "@oai/artifact-tool";

const OUT = "D:/zth/wk/pgm/blog/civ_vi_intro.pptx";
const TMP = "D:/zth/wk/pgm/blog/tmp_civ";
const COVER = "C:/Users/Administrator/AppData/Local/Temp/codex-clipboard-4119a0ea-7ce2-4af0-8425-d0cd2a1c0248.png";

const W = 1280;
const H = 720;
const BG = "#F4EFE6";
const INK = "#242321";
const MUTED = "#6B665E";
const TERRACOTTA = "#B55B3E";
const GOLD = "#D6A554";
const SAGE = "#5D786A";
const PALE = "#E8DFD1";

function addText(slide, text, left, top, width, height, style = {}, name) {
  const box = slide.shapes.add({
    geometry: "textbox",
    name,
    position: { left, top, width, height },
    fill: "none",
    line: { style: "solid", fill: "none", width: 0 },
  });
  box.text = text;
  box.text.style = {
    fontSize: 20,
    color: INK,
    fontFamily: "Aptos",
    ...style,
  };
  return box;
}

function addRect(slide, left, top, width, height, fill, lineFill = "none", radius = 0, name) {
  return slide.shapes.add({
    geometry: radius ? "roundRect" : "rect",
    name,
    position: { left, top, width, height },
    fill,
    line: { style: "solid", fill: lineFill, width: lineFill === "none" ? 0 : 1 },
    ...(radius ? { borderRadius: radius } : {}),
  });
}

function addRule(slide, left, top, width, color = TERRACOTTA, thickness = 3, name) {
  return slide.shapes.add({
    geometry: "line",
    name,
    position: { left, top, width, height: 0 },
    fill: "none",
    line: { style: "solid", fill: color, width: thickness },
  });
}

function addFooter(slide, index, label) {
  addRule(slide, 72, 666, 1136, PALE, 2, `footer-rule-${index}`);
  addText(slide, `CIVILIZATION VI  /  ${label.toUpperCase()}`, 72, 676, 460, 22, { fontSize: 11, bold: true, color: MUTED }, `footer-label-${index}`);
  addText(slide, String(index).padStart(2, "0"), 1160, 674, 48, 24, { fontSize: 12, bold: true, color: TERRACOTTA, alignment: "right" }, `footer-num-${index}`);
}

function addEyebrow(slide, text) {
  addText(slide, text.toUpperCase(), 72, 52, 500, 24, { fontSize: 12, bold: true, color: TERRACOTTA }, `eyebrow-${text}`);
}

function addSlideTitle(slide, title, subtitle = null) {
  addText(slide, title, 72, 88, 760, 62, { fontSize: 38, bold: true, color: INK }, `title-${title}`);
  if (subtitle) addText(slide, subtitle, 72, 148, 760, 34, { fontSize: 18, color: MUTED }, `subtitle-${title}`);
}

function addBullet(slide, x, y, label, body, accent, num) {
  addText(slide, String(num).padStart(2, "0"), x, y + 2, 42, 30, { fontSize: 14, bold: true, color: accent }, `bullet-num-${num}`);
  addText(slide, label, x + 58, y, 330, 32, { fontSize: 22, bold: true, color: INK }, `bullet-label-${num}`);
  addText(slide, body, x + 58, y + 34, 420, 58, { fontSize: 17, color: MUTED }, `bullet-body-${num}`);
  addRule(slide, x + 58, y + 104, 420, PALE, 2, `bullet-rule-${num}`);
}

function addEraStrip(slide, labels, activeIndex) {
  const x = 760;
  const y = 190;
  const gap = 10;
  const cellW = 94;
  labels.forEach((label, i) => {
    const active = i === activeIndex;
    addRect(slide, x + i * (cellW + gap), y, cellW, 76, active ? TERRACOTTA : PALE, "none", 12, `era-${i}`);
    addText(slide, label, x + i * (cellW + gap) + 8, y + 20, cellW - 16, 34, { fontSize: 13, bold: true, color: active ? "#FFFFFF" : MUTED, alignment: "center" }, `era-text-${i}`);
  });
  addRule(slide, x + 38, y + 94, (cellW + gap) * (labels.length - 1) + 1, TERRACOTTA, 2, "era-line");
}

function setNotes(slide, notes) {
  slide.speakerNotes.textFrame.setText(notes);
  slide.speakerNotes.setVisible(true);
}

async function writeBlob(path, blob) {
  await fs.writeFile(path, new Uint8Array(await blob.arrayBuffer()));
}

async function main() {
  await fs.mkdir(TMP, { recursive: true });
  const coverBytes = await fs.readFile(COVER);
  const p = Presentation.create({ slideSize: { width: W, height: H } });

  // Slide 1: title / cover
  {
    const s = p.slides.add();
    s.background.fill = BG;
    s.images.add({ blob: coverBytes, contentType: "image/png", alt: "Civilization VI cover art with a monumental statue and ancient landscape", fit: "cover", position: { left: 610, top: 0, width: 670, height: 720 } });
    addRect(s, 430, 0, 310, 720, { type: "gradient", gradientKind: "linear", angleDeg: 0, stops: [
      { offset: 0, color: BG },
      { offset: 72000, color: BG },
      { offset: 100000, color: "#F4EFE600" },
    ] }, "none", 0, "cover-fade");
    addText(s, "SID MEIER'S", 78, 84, 320, 24, { fontSize: 14, bold: true, color: TERRACOTTA }, "cover-eyebrow");
    addText(s, "Civilization VI", 72, 132, 540, 72, { fontSize: 54, bold: true, color: INK }, "cover-title");
    addText(s, "Build a world that stands the test of time", 76, 222, 480, 76, { fontSize: 28, bold: true, color: INK }, "cover-subtitle");
    addRule(s, 78, 326, 128, TERRACOTTA, 5, "cover-rule");
    addText(s, "An introduction to history, strategy, and leadership", 78, 354, 440, 48, { fontSize: 19, color: MUTED }, "cover-caption");
    addText(s, "6 slides  /  4 minutes", 78, 616, 260, 24, { fontSize: 13, bold: true, color: MUTED }, "cover-meta");
    setNotes(s, `Welcome. Today we are stepping into Civilization VI, a strategy game about building a society over thousands of years. You choose a people, guide its leaders, and decide what kind of future it will create. We will see how the game works, how you can win, and why its lesson reaches beyond the screen.\n\n[Sources]\n- Cover image: user-provided attachment.\n- Game overview: https://civilization.2k.com/civ-vi/`);
    addFooter(s, 1, "Opening");
  }

  // Slide 2: premise
  {
    const s = p.slides.add();
    s.background.fill = BG;
    addEyebrow(s, "The big idea");
    addSlideTitle(s, "What is Civilization VI?", "A history sandbox where every choice changes the map.");
    addText(s, "One turn at a time, you lead a real civilization from the Stone Age to the Modern Era.", 72, 218, 580, 72, { fontSize: 26, bold: true, color: INK }, "premise-callout");
    addBullet(s, 72, 330, "Turn-based strategy", "You plan, act, and then the world responds.", TERRACOTTA, 1);
    addBullet(s, 72, 470, "4X at a glance", "Explore, expand, use resources, and compete.", GOLD, 2);
    addEraStrip(s, ["Stone", "Classical", "Medieval", "Modern"], 1);
    addText(s, "Choose a leader", 760, 334, 360, 28, { fontSize: 22, bold: true, color: INK }, "leader-title");
    addText(s, "Cleopatra  •  Abraham Lincoln  •  Qin Shi Huang", 760, 372, 420, 72, { fontSize: 18, color: MUTED }, "leader-list");
    addText(s, "Each leader brings a different bonus and a different story.", 760, 478, 380, 52, { fontSize: 17, color: SAGE }, "leader-note");
    setNotes(s, `Civilization VI is turn-based, so you have time to think before you act. You lead a real historical civilization, starting with a small settlement and moving through major eras. The game is often called "4X": explore, expand, use resources wisely, and compete. You also choose a leader. Cleopatra, Abraham Lincoln, and Qin Shi Huang are examples. Their abilities change how you play, so history becomes a set of choices you can feel.\n\n[Sources]\n- Game systems and leaders: https://civilization.2k.com/civ-vi/\n- 4X term: https://en.wikipedia.org/wiki/4X`);
    addFooter(s, 2, "Premise");
  }

  // Slide 3: gameplay
  {
    const s = p.slides.add();
    s.background.fill = BG;
    addEyebrow(s, "Your turn");
    addSlideTitle(s, "How Do You Play?", "Every turn connects a small choice to a long-term plan.");
    addRule(s, 116, 252, 1000, PALE, 6, "play-line");
    const steps = [
      ["01", "Build & expand", "Grow cities. Balance food, gold, and production.", TERRACOTTA],
      ["02", "Research & discover", "Use Science and Civics trees to unlock tools and laws.", GOLD],
      ["03", "Interact", "Trade with neighbors, make friends, or fight when needed.", SAGE],
    ];
    steps.forEach((step, i) => {
      const x = 86 + i * 378;
      addRect(s, x, 220, 74, 74, step[3], "none", 37, `step-circle-${i}`);
      addText(s, step[0], x, 244, 74, 30, { fontSize: 17, bold: true, color: "#FFFFFF", alignment: "center" }, `step-num-${i}`);
      addText(s, step[1], x, 330, 300, 32, { fontSize: 22, bold: true, color: INK }, `step-title-${i}`);
      addText(s, step[2], x, 376, 300, 70, { fontSize: 17, color: MUTED }, `step-body-${i}`);
    });
    addRect(s, 86, 520, 1040, 82, PALE, "none", 10, "city-strip");
    addText(s, "A city is a promise: place it well, then let it grow.", 114, 544, 760, 32, { fontSize: 21, bold: true, color: INK }, "city-quote");
    addText(s, "Resources  →  Districts  →  New possibilities", 850, 546, 240, 36, { fontSize: 14, bold: true, color: TERRACOTTA, alignment: "right" }, "city-sequence");
    setNotes(s, `A normal turn has three parts. First, build and expand. Cities need food to grow, gold to pay for things, and production to make buildings and units. Where you place a city or district matters because the map gives bonuses. Second, research and discover. The Science tree unlocks technologies, while Civics unlocks laws and governments. Third, interact. You can trade, make friends, or go to war. Small actions connect: a farm helps a city grow, and research opens new choices.\n\n[Sources]\n- Districts, resources, Science and Civics: https://civilization.2k.com/civ-vi/`);
    addFooter(s, 3, "Gameplay");
  }

  // Slide 4: victories
  {
    const s = p.slides.add();
    s.background.fill = BG;
    addEyebrow(s, "The finish line");
    addSlideTitle(s, "Ways to Win", "There is no single best path. Your strategy sets the goal.");
    const routes = [
      ["SCIENCE", "Reach the stars", "Launch a mission and begin the journey to Mars.", TERRACOTTA],
      ["CULTURE", "Make people curious", "Build wonders, share art, and attract tourists.", GOLD],
      ["DOMINATION", "Control capitals", "Conquer every rival capital through military strength.", SAGE],
      ["DIPLOMACY", "Build agreement", "Use the World Congress to solve global problems.", "#7D6A8D"],
    ];
    routes.forEach((r, i) => {
      const x = 72 + (i % 2) * 570;
      const y = 230 + Math.floor(i / 2) * 176;
      addRule(s, x, y + 6, 56, r[3], 5, `route-rule-${i}`);
      addText(s, r[0], x, y + 26, 190, 26, { fontSize: 13, bold: true, color: r[3] }, `route-label-${i}`);
      addText(s, r[1], x, y + 58, 430, 32, { fontSize: 24, bold: true, color: INK }, `route-title-${i}`);
      addText(s, r[2], x, y + 98, 450, 48, { fontSize: 17, color: MUTED }, `route-body-${i}`);
    });
    addText(s, "Violence is one tool, not the whole game.", 72, 600, 720, 28, { fontSize: 20, bold: true, color: INK }, "victory-line");
    setNotes(s, `Civilization VI gives you several ways to win. A Science victory asks you to reach space and begin a mission toward Mars. A Culture victory asks you to make your civilization so interesting that tourists visit. Domination is the military route: capture every rival capital. Religion and Diplomacy offer other choices, including spreading beliefs or using the World Congress to build agreement. Winning is not the same as fighting. Planning, timing, and knowing what neighbors value can matter as much as an army.\n\n[Sources]\n- Victory conditions and World Congress: https://civilization.2k.com/civ-vi/`);
    addFooter(s, 4, "Victory");
  }

  // Slide 5: value
  {
    const s = p.slides.add();
    s.background.fill = BG;
    addEyebrow(s, "Why it matters");
    addSlideTitle(s, "Why is Civ VI Great?", "It turns history into a problem you can explore.");
    addText(s, "The map is different every time. So is the story.", 72, 216, 610, 72, { fontSize: 30, bold: true, color: INK }, "value-callout");
    const values = [
      ["LEARN HISTORY", "Meet real leaders, wonders, and turning points.", TERRACOTTA],
      ["PRACTICE STRATEGY", "Plan ahead, control resources, and decide under pressure.", GOLD],
      ["MAKE A STORY", "Each map creates a new challenge and a new memory.", SAGE],
    ];
    values.forEach((v, i) => {
      const y = 336 + i * 82;
      addRect(s, 72, y, 16, 54, v[2], "none", 8, `value-bar-${i}`);
      addText(s, v[0], 116, y - 2, 280, 26, { fontSize: 14, bold: true, color: v[2] }, `value-label-${i}`);
      addText(s, v[1], 116, y + 26, 540, 42, { fontSize: 18, color: MUTED }, `value-body-${i}`);
    });
    addRect(s, 820, 220, 290, 300, PALE, "none", 14, "map-surface");
    addText(s, "YOUR\nMAP", 852, 266, 230, 90, { fontSize: 42, bold: true, color: TERRACOTTA, alignment: "center" }, "map-title");
    addRule(s, 864, 392, 200, TERRACOTTA, 4, "map-rule");
    addText(s, "Same game.\nNew choices.", 852, 422, 230, 64, { fontSize: 20, bold: true, color: INK, alignment: "center" }, "map-caption");
    setNotes(s, `Civ VI gives learning a shape. You see real wonders, leaders, and achievements, but you also ask why they mattered. The game builds strategy skills: planning, managing limited resources, and deciding when you cannot have everything. Every map is different. One game may give you a strong coast and friendly neighbors; another may place you beside a rival empire. The rules stay steady, but the story changes. History feels less like a list to memorize and more like a world to understand.\n\n[Sources]\n- Historical civilizations and wonders: https://civilization.2k.com/civ-vi/`);
    addFooter(s, 5, "Value");
  }

  // Slide 6: conclusion
  {
    const s = p.slides.add();
    s.background.fill = INK;
    addEyebrow(s, "The larger lesson");
    addText(s, "History is Yours to Build", 72, 102, 760, 72, { fontSize: 48, bold: true, color: "#FFFFFF" }, "closing-title");
    addText(s, "A game about power can still teach us about responsibility.", 74, 192, 620, 42, { fontSize: 22, color: "#D9D1C5" }, "closing-subtitle");
    addRule(s, 76, 282, 160, TERRACOTTA, 6, "closing-rule");
    addText(s, "War is costly.\nKnowledge, diplomacy, and culture\ncreate lasting growth.", 76, 330, 540, 152, { fontSize: 31, bold: true, color: "#FFFFFF" }, "closing-message");
    addText(s, "The strongest future is not built by one leader alone.\nIt is built when people learn, listen, and work together.", 76, 520, 620, 64, { fontSize: 19, color: "#D9D1C5" }, "closing-final");
    addRect(s, 860, 144, 260, 360, "#3A3935", "#676157", 18, "closing-panel");
    addText(s, "BUILD", 910, 190, 160, 28, { fontSize: 14, bold: true, color: GOLD, alignment: "center" }, "closing-build");
    addText(s, "WISDOM", 910, 302, 160, 28, { fontSize: 14, bold: true, color: TERRACOTTA, alignment: "center" }, "closing-wisdom");
    addText(s, "TOGETHER", 900, 414, 180, 28, { fontSize: 14, bold: true, color: SAGE, alignment: "center" }, "closing-together");
    addRule(s, 946, 236, 90, "#676157", 2, "closing-rule-1");
    addRule(s, 946, 348, 90, "#676157", 2, "closing-rule-2");
    addText(s, "Civilization is not only what we inherit.\nIt is what we choose next.", 814, 554, 350, 58, { fontSize: 17, color: "#D9D1C5", alignment: "center" }, "closing-tagline");
    addRule(s, 72, 666, 1136, "#4B4842", 2, "closing-footer-rule");
    addText(s, "CIVILIZATION VI  /  CONCLUSION", 72, 676, 460, 22, { fontSize: 11, bold: true, color: "#AFA79B" }, "closing-footer");
    addText(s, "06", 1160, 674, 48, 24, { fontSize: 12, bold: true, color: GOLD, alignment: "right" }, "closing-num");
    setNotes(s, `Civilization VI is a mirror of human history. It shows that war can change a map, but also shows the cost: lost time, lost people, and fewer choices for the future. Knowledge, diplomacy, and culture can create growth that lasts. History is not built by battles alone. It is built when people cooperate, learn from the past, and imagine a future they cannot see yet. In the game, you choose what comes next. In real life, we do that together.\n\n[Sources]\n- Historical framing and game systems: https://civilization.2k.com/civ-vi/`);
  }

  for (const [i, slide] of p.slides.items.entries()) {
    const stem = `slide-${String(i + 1).padStart(2, "0")}`;
    await writeBlob(`${TMP}/${stem}.png`, await p.export({ slide, format: "png", scale: 1 }));
    await fs.writeFile(`${TMP}/${stem}.layout.json`, await (await slide.export({ format: "layout" })).text());
  }
  await writeBlob(`${TMP}/deck-montage.webp`, await p.export({ format: "webp", montage: true, scale: 1 }));
  const pptx = await PresentationFile.exportPptx(p);
  await pptx.save(OUT);
  console.log(`Wrote ${OUT}`);
}

main().catch((err) => { console.error(err); process.exitCode = 1; });
