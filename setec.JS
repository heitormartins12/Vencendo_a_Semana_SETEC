const state = {
  day: 1,
  hour: 7,
  sono: 58,
  comida: 55,
  estudo: 0,
  lazer: 48,
  knowledge: 0,
  effects: [],
  gameOver: false,
  _cafeCrash: undefined
};

const dayNames = ["", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira"];

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randf(min, max) {
  return Math.random() * (max - min) + min;
}

const quizEasy = [
  {
    question: "Qual é a melhor estratégia para estudar de forma eficiente?",
    options: [
      "Estudar 8 horas seguidas sem pausa",
      "Fazer sessões de 25-50 minutos com pausas",
      "Só estudar na véspera da prova",
      "Estudar enquanto assiste séries"
    ],
    correct: 1
  },
  {
    question: "O que acontece quando você dorme pouco durante a semana de provas?",
    options: [
      "A memória fica mais afiada",
      "A concentração e a retenção de conteúdo diminuem",
      "Você fica mais produtivo",
      "Nada muda"
    ],
    correct: 1
  },
  {
    question: "Qual hábito ajuda a evitar o burnout?",
    options: [
      "Eliminar todo lazer da rotina",
      "Só beber café e energéticos",
      "Incluir momentos de lazer de qualidade e descanso",
      "Estudar até tarde todos os dias"
    ],
    correct: 2
  },
  {
    question: "O que é mais recomendado na alimentação durante períodos de estudo intenso?",
    options: [
      "Só fast-food porque é mais rápido",
      "Pular refeições para ganhar tempo",
      "Refeições balanceadas que mantêm a energia estável",
      "Apenas café e chocolate"
    ],
    correct: 2
  },
  {
    question: "Por que o lazer é importante na semana de provas?",
    options: [
      "Não é importante, só estude",
      "Ajuda a reduzir o estresse e manter a motivação",
      "Só serve para procrastinar",
      "Aumenta o sono automaticamente"
    ],
    correct: 1
  }
];

const quizMedium = [
  {
    question: "Qual técnica de estudo costuma gerar melhor retenção a longo prazo?",
    options: [
      "Releitura passiva do material várias vezes",
      "Prática de recuperação (testar a si mesmo) + espaçamento",
      "Destacar todo o texto com marca-texto",
      "Ouvir o conteúdo enquanto dorme"
    ],
    correct: 1
  },
  {
    question: "O que a privação de sono causa no cérebro durante o aprendizado?",
    options: [
      "Aumenta a plasticidade cerebral",
      "Prejudica a consolidação da memória e a atenção",
      "Melhora o raciocínio lógico",
      "Não afeta o desempenho cognitivo"
    ],
    correct: 1
  },
  {
    question: "Qual combinação de fatores mais favorece o desempenho em provas?",
    options: [
      "Sono adequado + alimentação estável + estudo distribuído",
      "Estudar a noite toda + café em excesso",
      "Pular refeições + estudar 10 horas seguidas",
      "Só fazer exercícios de fixação no último dia"
    ],
    correct: 0
  },
  {
    question: "O que caracteriza o efeito 'crash de cafeína'?",
    options: [
      "Aumento permanente de energia",
      "Queda brusca de energia e foco após o efeito acabar",
      "Melhora da qualidade do sono",
      "Aumento do lazer"
    ],
    correct: 1
  },
  {
    question: "Por que estudar em grupo pode ser vantajoso?",
    options: [
      "Porque você não precisa se preparar",
      "Permite trocar explicações e reforça o aprendizado social",
      "Garante nota máxima automaticamente",
      "Substitui completamente o estudo individual"
    ],
    correct: 1
  },
  {
    question: "Qual é o risco principal de passar muito tempo em redes sociais durante a semana de provas?",
    options: [
      "Ganho excessivo de lazer",
      "Procrastinação, perda de tempo e redução do sono",
      "Aumento automático de conhecimento",
      "Melhora da concentração"
    ],
    correct: 1
  },
  {
    question: "O que é 'burnout' no contexto de estudos?",
    options: [
      "Estar muito motivado",
      "Esgotamento físico e mental por excesso de pressão e falta de recuperação",
      "Dormir demais",
      "Comer bem demais"
    ],
    correct: 1
  }
];

const quizHard = [
  {
    question: "Qual mecanismo explica por que o sono é fundamental para a memória?",
    options: [
      "O cérebro desliga completamente e 'reseta'",
      "Durante o sono ocorre a consolidação das memórias formadas no dia",
      "O sono aumenta a produção de adrenalina",
      "Dormir pouco libera mais cortisol e melhora o foco"
    ],
    correct: 1
  },
  {
    question: "Na curva de esquecimento de Ebbinghaus, o que é mais eficaz para reter conteúdo?",
    options: [
      "Estudar tudo de uma vez na véspera",
      "Revisões espaçadas ao longo dos dias",
      "Ler o material uma única vez com muita atenção",
      "Só fazer resumos coloridos"
    ],
    correct: 1
  },
  {
    question: "Qual combinação de estados mais prejudica o rendimento de uma sessão de estudo?",
    options: [
      "Sono alto + comida estável + lazer moderado",
      "Sono baixo + fome + lazer muito baixo (risco de burnout)",
      "Sono médio + refeição leve + lazer alto",
      "Sono alto + fast-food + lazer alto"
    ],
    correct: 1
  },
  {
    question: "Por que a prática intercalada (misturar assuntos) costuma ser superior à prática bloqueada?",
    options: [
      "Porque é mais fácil e confortável",
      "Porque força o cérebro a discriminar e recuperar informações diferentes, gerando retenção mais robusta",
      "Porque permite estudar menos horas",
      "Porque elimina a necessidade de sono"
    ],
    correct: 1
  },
  {
    question: "Qual o efeito mais provável de consumir café em excesso perto do horário de dormir?",
    options: [
      "Sono mais profundo e restaurador",
      "Dificuldade para iniciar e manter o sono + piora no desempenho no dia seguinte",
      "Aumento permanente de conhecimento",
      "Eliminação do burnout"
    ],
    correct: 1
  },
  {
    question: "No contexto de autorregulação do aprendizado, o que é metacognição?",
    options: [
      "Decorar o máximo de conteúdo possível",
      "A capacidade de monitorar e regular o próprio processo de aprendizagem",
      "Estudar apenas o que o professor pediu",
      "Evitar qualquer tipo de lazer"
    ],
    correct: 1
  },
  {
    question: "Qual estratégia reduz mais o risco de procrastinação na semana de provas?",
    options: [
      "Deixar as tarefas mais difíceis para o final do dia",
      "Quebrar o estudo em blocos curtos com metas claras e recompensas de lazer controladas",
      "Só estudar quando sentir motivação",
      "Eliminar todas as pausas"
    ],
    correct: 1
  },
  {
    question: "Por que a alimentação estável influencia o desempenho cognitivo?",
    options: [
      "Porque o cérebro consome muita glicose e precisa de energia constante",
      "Porque comer pouco libera mais tempo para estudar",
      "Porque jejum prolongado aumenta o foco permanentemente",
      "Porque fast-food contém nutrientes especiais para a memória"
    ],
    correct: 0
  },
  {
    question: "Qual o principal objetivo de equilibrar sono, alimentação, estudo e lazer?",
    options: [
      "Zerar todas as barras o mais rápido possível",
      "Maximizar o desempenho sustentável e a probabilidade de passar na prova",
      "Gastar o máximo de tempo possível em redes sociais",
      "Dormir o mínimo e estudar 16 horas por dia"
    ],
    correct: 1
  }
];

function startGame() {
  const menu = document.getElementById("start-menu");
  const game = document.getElementById("game-container");

  menu.classList.add("hide");

  setTimeout(() => {
    menu.style.display = "none";
    game.classList.remove("hidden");
  }, 600);
}

function openHelp() {
  document.getElementById("help-modal").classList.add("active");
}

function closeHelp() {
  document.getElementById("help-modal").classList.remove("active");
}

function clamp(v) {
  return Math.max(0, Math.min(100, Math.round(v)));
}

function addLog(msg, important = false) {
  const log = document.getElementById("log");
  if (!log) return;
  const p = document.createElement("p");
  p.textContent = msg;
  if (important) p.classList.add("important");
  log.prepend(p);
}

function updateUI() {
  document.getElementById("day-name").textContent = dayNames[state.day];
  document.getElementById("time").textContent = formatTime(state.hour);
  document.getElementById("knowledge-value").textContent = state.knowledge;

  document.getElementById("sono-val").textContent = state.sono;
  document.getElementById("comida-val").textContent = state.comida;
  document.getElementById("estudo-val").textContent = state.estudo;
  document.getElementById("lazer-val").textContent = state.lazer;

  document.getElementById("sono-bar").style.width = state.sono + "%";
  document.getElementById("comida-bar").style.width = state.comida + "%";
  document.getElementById("estudo-bar").style.width = state.estudo + "%";
  document.getElementById("lazer-bar").style.width = state.lazer + "%";

  const effectsDiv = document.getElementById("effects");
  effectsDiv.innerHTML = "";
  state.effects.forEach(e => {
    const span = document.createElement("span");
    span.className = "effect" + (e.good ? " good" : "");
    span.textContent = e.name;
    effectsDiv.appendChild(span);
  });

  updateCharacter();
}

function formatTime(h) {
  const realHour = Math.floor(h) % 24;
  return String(realHour).padStart(2, "0") + ":00";
}

function getHourModifier() {
  const h = state.hour % 24;
  if (h >= 7 && h < 12) return randf(1.05, 1.18);
  if (h >= 12 && h < 18) return randf(0.92, 1.08);
  if (h >= 18 && h < 23) return randf(0.75, 0.90);
  return randf(0.45, 0.65);
}

function getSonoMod() {
  if (state.sono >= 65) return randf(0.95, 1.05);
  if (state.sono >= 45) return randf(0.72, 0.88);
  if (state.sono >= 25) return randf(0.45, 0.62);
  return randf(0.28, 0.42);
}

function getComidaMod() {
  if (state.comida >= 55) return randf(0.95, 1.05);
  if (state.comida >= 35) return randf(0.78, 0.92);
  return randf(0.55, 0.72);
}

function getLazerMod() {
  if (state.lazer >= 45) return randf(0.95, 1.05);
  if (state.lazer >= 25) return randf(0.78, 0.92);
  return randf(0.50, 0.68);
}

function hasEffect(name) {
  return state.effects.some(e => e.name === name);
}

function addEffect(name, good = false) {
  if (!hasEffect(name)) {
    state.effects.push({ name, good });
  }
}

function removeEffect(name) {
  state.effects = state.effects.filter(e => e.name !== name);
}

function updateCharacter() {
  const face = document.getElementById("character-face");
  const status = document.getElementById("character-status");
  const character = document.getElementById("character");

  character.className = "character";

  if (state.sono <= 12 || state.comida <= 12 || state.lazer <= 8) {
    face.textContent = "😵";
    status.textContent = "Estado crítico!";
    character.classList.add("critical");
  }
  else if (state.sono <= 28) {
    face.textContent = "😴";
    status.textContent = "Muito cansado...";
    character.classList.add("tired");
  }
  else if (state.comida <= 28) {
    face.textContent = "🤢";
    status.textContent = "Precisa comer";
    character.classList.add("hungry");
  }
  else if (state.lazer <= 22) {
    face.textContent = "😩";
    status.textContent = "Quase em burnout";
    character.classList.add("burnout");
  }
  else if (state.estudo >= 70) {
    face.textContent = "🤓";
    status.textContent = "Muito focado nos estudos";
    character.classList.add("focused");
  }
  else if (state.sono >= 65 && state.comida >= 55 && state.lazer >= 45) {
    face.textContent = "😎";
    status.textContent = "Estudante equilibrado";
  }
  else if (state.lazer >= 70) {
    face.textContent = "😄";
    status.textContent = "De boa na lagoa";
  }
  else {
    face.textContent = "😊";
    status.textContent = "Seguindo a rotina";
  }
}

const actions = {
  dormir8: {
    hours: 8,
    run() {
      const sonoGain = rand(52, 72);
      const lazerGain = rand(4, 12);
      const comidaLoss = rand(8, 16);
      state.sono = clamp(state.sono + sonoGain);
      state.lazer = clamp(state.lazer + lazerGain);
      state.comida = clamp(state.comida - comidaLoss);
      addLog(`Você dormiu 8 horas. +${sonoGain} sono. Acordou recuperado.`);
    }
  },
  dormir6: {
    hours: 6,
    run() {
      const sonoGain = rand(32, 50);
      const lazerGain = rand(1, 6);
      const comidaLoss = rand(6, 12);
      state.sono = clamp(state.sono + sonoGain);
      state.lazer = clamp(state.lazer + lazerGain);
      state.comida = clamp(state.comida - comidaLoss);
      addLog(`Dormiu 6 horas. +${sonoGain} sono. Recuperação parcial.`);
    }
  },
  cochilo: {
    hours: 2,
    run() {
      const sonoGain = rand(12, 24);
      const comidaLoss = rand(2, 6);
      state.sono = clamp(state.sono + sonoGain);
      state.comida = clamp(state.comida - comidaLoss);
      addLog(`Cochilo de 2 horas. +${sonoGain} sono. Alívio rápido.`);
    }
  },
  refeicao: {
    hours: 2,
    run() {
      const comidaGain = rand(40, 58);
      state.comida = clamp(state.comida + comidaGain);
      if (Math.random() < 0.75) addEffect("Foco Alimentar", true);
      addLog(`Refeição balanceada. +${comidaGain} alimentação. Você se sente bem.`);
    }
  },
  fastfood: {
    hours: 1,
    run() {
      const comidaGain = rand(22, 38);
      state.comida = clamp(state.comida + comidaGain);
      if (Math.random() < 0.85) addEffect("Letargia");
      addLog(`Fast-food... +${comidaGain} comida. Rápido, mas pesado.`);
    }
  },
  cafe: {
    hours: 1,
    run() {
      addEffect("Cafeína", true);
      state._cafeCrash = rand(2, 3);
      addLog("Café tomado! Energia temporária. Cuidado com o crash.");
    }
  },
  estudar2: {
    hours: 2,
    run() {
      const base = rand(8, 14);
      const ganho = Math.round(base * getSonoMod() * getComidaMod() * getLazerMod() * getHourModifier());
      state.estudo = clamp(state.estudo + ganho);
      state.knowledge = state.estudo;
      state.sono = clamp(state.sono - rand(6, 12));
      state.lazer = clamp(state.lazer - rand(7, 14));
      state.comida = clamp(state.comida - rand(4, 8));
      addLog(`Estudou 2 horas. +${ganho} de conhecimento.`);
    }
  },
  revisao: {
    hours: 1,
    run() {
      const base = rand(4, 8);
      const ganho = Math.round(base * getSonoMod() * getComidaMod() * getLazerMod() * getHourModifier());
      state.estudo = clamp(state.estudo + ganho);
      state.knowledge = state.estudo;
      state.sono = clamp(state.sono - rand(2, 6));
      state.lazer = clamp(state.lazer - rand(3, 7));
      state.comida = clamp(state.comida - rand(1, 4));
      addLog(`Revisão rápida. +${ganho} de conhecimento.`);
    }
  },
  grupo: {
    hours: 3,
    run() {
      const base = rand(10, 17);
      const ganho = Math.round(base * getSonoMod() * getComidaMod() * getLazerMod() * getHourModifier());
      state.estudo = clamp(state.estudo + ganho);
      state.knowledge = state.estudo;
      state.sono = clamp(state.sono - rand(7, 13));
      state.lazer = clamp(state.lazer + rand(6, 15));
      state.comida = clamp(state.comida - rand(4, 9));
      addLog(`Grupo de estudos. +${ganho} de conhecimento + lazer social.`);
    }
  },
  passeio: {
    hours: 2,
    run() {
      const lazerGain = rand(22, 36);
      state.lazer = clamp(state.lazer + lazerGain);
      state.sono = clamp(state.sono + rand(0, 5));
      state.comida = clamp(state.comida - rand(3, 7));
      addLog(`Passeio / hobby. +${lazerGain} lazer de qualidade!`);
    }
  },
  serie: {
    hours: 2,
    run() {
      const lazerGain = rand(12, 22);
      state.lazer = clamp(state.lazer + lazerGain);
      state.sono = clamp(state.sono - rand(1, 5));
      state.comida = clamp(state.comida - rand(3, 7));
      addLog(`Série assistida. +${lazerGain} lazer. Relaxe um pouco.`);
    }
  },
  redes: {
    hours: 1,
    run() {
      let ganho = rand(3, 8);
      if (Math.random() < 0.55) {
        ganho = rand(1, 4);
        addEffect("Feed Infinito");
        state.hour += randf(1.0, 2.0);
        state.sono = clamp(state.sono - rand(3, 7));
        addLog("Você caiu no Feed Infinito... perdeu tempo extra e sono.");
      } else {
        addLog(`Scroll nas redes. +${ganho} lazer baixo.`);
      }
      state.lazer = clamp(state.lazer + ganho);
      state.sono = clamp(state.sono - rand(2, 5));
      state.comida = clamp(state.comida - rand(1, 4));
    }
  }
};

function doAction(name) {
  if (state.gameOver) return;

  const action = actions[name];
  if (!action) return;

  state.hour += action.hours;
  state.comida = clamp(state.comida - action.hours * randf(1.9, 2.9));
  state.sono = clamp(state.sono - action.hours * randf(1.3, 2.1));

  action.run();

  if (state._cafeCrash !== undefined) {
    state._cafeCrash--;
    if (state._cafeCrash <= 0) {
      removeEffect("Cafeína");
      addEffect("Crash de Cafeína");
      const crashSono = rand(12, 24);
      const crashLazer = rand(3, 10);
      state.sono = clamp(state.sono - crashSono);
      state.lazer = clamp(state.lazer - crashLazer);
      addLog(`Crash de cafeína! –${crashSono} sono. Você se sente drenado.`);
      delete state._cafeCrash;
    }
  }

  checkStatus();

  if (Math.random() < randf(0.30, 0.45) && state.hour < 28) {
    triggerEvent();
  }

  if (state.hour >= 28) {
    endDay();
  }

  updateUI();
  checkGameOver();
}

function checkStatus() {
  if (state.sono <= 22) addEffect("Névoa Mental");
  else removeEffect("Névoa Mental");

  if (state.lazer <= 12) addEffect("Burnout");
  else removeEffect("Burnout");

  if (state.comida <= 18) addEffect("Fome");
  else removeEffect("Fome");

  if (hasEffect("Letargia") && Math.random() < 0.35) {
    const loss = rand(1, 4);
    state.estudo = clamp(state.estudo - loss);
    state.knowledge = state.estudo;
  }
}

const events = [
  {
    title: "Convite para ranked",
    text: "Seus amigos te chamaram para jogar. Vai topa? (pode custar sono e tempo)",
    choices: [
      {
        label: "Aceitar (+Lazer, –Sono grande)",
        effect() {
          const lazerGain = rand(12, 26);
          const sonoLoss = rand(12, 24);
          state.lazer = clamp(state.lazer + lazerGain);
          state.sono = clamp(state.sono - sonoLoss);
          state.hour += randf(1.5, 3.0);
          addLog(`Você jogou. +${lazerGain} lazer, –${sonoLoss} sono.`);
        }
      },
      {
        label: "Recusar (pequena perda de lazer)",
        effect() {
          const loss = rand(3, 9);
          state.lazer = clamp(state.lazer - loss);
          addLog(`Você recusou o convite. –${loss} lazer.`);
        }
      }
    ]
  },
  {
    title: "Mensagem do grupo",
    text: "O grupo de trabalho mandou mensagem pedindo ajuda urgente. O que fazer?",
    choices: [
      {
        label: "Responder agora (+Estudo, –Sono)",
        effect() {
          const gain = rand(3, 9);
          const sonoLoss = rand(6, 14);
          state.estudo = clamp(state.estudo + gain);
          state.knowledge = state.estudo;
          state.sono = clamp(state.sono - sonoLoss);
          addLog(`Você ajudou o grupo. +${gain} conhecimento, –${sonoLoss} sono.`);
        }
      },
      {
        label: "Deixar para depois (risco de cobrança)",
        effect() {
          if (Math.random() < 0.45) {
            const loss = rand(4, 12);
            state.lazer = clamp(state.lazer - loss);
            addLog(`O grupo cobrou depois. –${loss} lazer (estresse).`);
          } else {
            addLog("Você deixou para depois. Por enquanto ok.");
          }
        }
      }
    ]
  },
  {
    title: "Mais café?",
    text: "Você está cansado. Tomar mais café?",
    choices: [
      {
        label: "Tomar (energia + crash forte)",
        effect() {
          addEffect("Cafeína", true);
          state._cafeCrash = rand(2, 3);
          addLog("Mais café! Energia subindo... o crash será pesado.");
        }
      },
      {
        label: "Não tomar",
        effect() {
          addLog("Você resistiu ao café. Decisão sábia a longo prazo.");
        }
      }
    ]
  },
  {
    title: "Amigo chamou para sair",
    text: "Um amigo quer te encontrar agora. Aceita?",
    choices: [
      {
        label: "Aceitar (+Lazer bom)",
        effect() {
          const gain = rand(18, 32);
          state.lazer = clamp(state.lazer + gain);
          state.hour += randf(1.5, 2.5);
          state.comida = clamp(state.comida - rand(3, 9));
          addLog(`Saída com amigo. +${gain} lazer de qualidade!`);
        }
      },
      {
        label: "Ficar estudando",
        effect() {
          const gain = rand(2, 7);
          state.estudo = clamp(state.estudo + gain);
          state.knowledge = state.estudo;
          state.lazer = clamp(state.lazer - rand(5, 12));
          addLog(`Você priorizou os estudos. +${gain} conhecimento.`);
        }
      }
    ]
  },
  {
    title: "Ansiedade pré-prova",
    text: "Você sentiu um pico de ansiedade. Como reagir?",
    choices: [
      {
        label: "Fazer uma pausa de lazer (+Lazer, –tempo)",
        effect() {
          const gain = rand(10, 20);
          state.lazer = clamp(state.lazer + gain);
          state.hour += randf(0.8, 1.5);
          addLog(`Pausa consciente. +${gain} lazer. A ansiedade diminuiu.`);
        }
      },
      {
        label: "Forçar o estudo mesmo assim",
        effect() {
          state.sono = clamp(state.sono - rand(5, 12));
          state.lazer = clamp(state.lazer - rand(6, 14));
          if (Math.random() < 0.5) {
            const gain = rand(1, 5);
            state.estudo = clamp(state.estudo + gain);
            state.knowledge = state.estudo;
            addLog(`Você forçou. +${gain} conhecimento, mas saiu mais desgastado.`);
          } else {
            addLog("A ansiedade atrapalhou. Pouco rendimento.");
          }
        }
      }
    ]
  },
  {
    title: "Material difícil",
    text: "O conteúdo de hoje está bem pesado. O que fazer?",
    choices: [
      {
        label: "Insistir com foco total (mais ganho, mais desgaste)",
        effect() {
          const extra = Math.round(rand(3, 8) * getSonoMod() * getComidaMod());
          state.estudo = clamp(state.estudo + extra);
          state.knowledge = state.estudo;
          state.sono = clamp(state.sono - rand(4, 10));
          state.lazer = clamp(state.lazer - rand(3, 9));
          addLog(`Você insistiu. +${extra} conhecimento, mas cansou mais.`);
        }
      },
      {
        label: "Fazer só o básico e descansar",
        effect() {
          const gain = rand(1, 4);
          state.estudo = clamp(state.estudo + gain);
          state.knowledge = state.estudo;
          addLog(`Você priorizou o equilíbrio. +${gain} conhecimento.`);
        }
      }
    ]
  }
];

function triggerEvent() {
  const event = events[Math.floor(Math.random() * events.length)];
  showModal(event);
}

function showModal(event) {
  const modal = document.getElementById("modal");
  document.getElementById("modal-title").textContent = event.title;
  document.getElementById("modal-text").textContent = event.text;

  const buttons = document.getElementById("modal-buttons");
  buttons.innerHTML = "";

  event.choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.className = "modal-btn";
    btn.textContent = choice.label;
    btn.onclick = () => {
      choice.effect();
      checkStatus();
      updateUI();
      modal.classList.remove("active");
      checkGameOver();
    };
    buttons.appendChild(btn);
  });

  modal.classList.add("active");
}

function endDay() {
  state.day++;
  state.hour = 7;

  state.sono = clamp(state.sono + rand(2, 7));
  state.comida = clamp(state.comida - rand(6, 14));

  if (state.day > 5) {
    startQuiz();
    return;
  }

  addLog(`--- Fim do dia. Começando ${dayNames[state.day]} ---`, true);
  updateUI();
}

function checkGameOver() {
  if (state.sono <= 0 || state.comida <= 0 || state.lazer <= 0) {
    endGame(false);
  }
}

function getQuizConfig() {
  const k = state.knowledge;

  if (k >= 70) {
    return {
      level: "fácil",
      count: 3,
      pool: quizEasy,
      pointsPerCorrect: 14,
      description: "Você estudou bastante! A prova será mais curta e direta."
    };
  }
  if (k >= 40) {
    return {
      level: "média",
      count: 5,
      pool: quizMedium,
      pointsPerCorrect: 9,
      description: "Conhecimento intermediário. A prova terá 5 questões de dificuldade média."
    };
  }
  return {
    level: "difícil",
    count: 7,
    pool: quizHard,
    pointsPerCorrect: 6,
    description: "Pouco conhecimento acumulado. A prova será longa e exigente. Boa sorte."
  };
}

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function startQuiz() {
  state.gameOver = true;
  document.getElementById("game").classList.add("hidden");

  const config = getQuizConfig();
  const selected = shuffle(config.pool).slice(0, config.count);

  state._quizConfig = config;
  state._quizSelected = selected;

  const quizScreen = document.getElementById("quiz-screen");
  quizScreen.classList.remove("hidden");

  document.getElementById("quiz-intro").textContent =
    `Nível da prova: ${config.level.toUpperCase()} (${config.count} questões). ${config.description}`;

  const container = document.getElementById("quiz-container");
  container.innerHTML = "";

  selected.forEach((q, index) => {
    const div = document.createElement("div");
    div.className = "quiz-question";
    div.innerHTML = `
      <h3>${index + 1}. ${q.question}</h3>
      <div class="quiz-options">
        ${q.options.map((opt, i) => `
          <label>
            <input type="radio" name="q${index}" value="${i}">
            ${opt}
          </label>
        `).join("")}
      </div>
    `;
    container.appendChild(div);
  });
}

function submitQuiz() {
  const config = state._quizConfig;
  const selected = state._quizSelected;
  let acertos = 0;

  selected.forEach((q, index) => {
    const radio = document.querySelector(`input[name="q${index}"]:checked`);
    if (radio && parseInt(radio.value) === q.correct) {
      acertos++;
    }
  });

  const pontosQuiz = acertos * config.pointsPerCorrect;
  const notaBase = Math.round(state.knowledge * 0.55 + pontosQuiz);

  let bonus = 0;
  if (state.sono >= 50) bonus += rand(2, 5);
  if (state.comida >= 45) bonus += rand(2, 4);
  if (state.lazer >= 35) bonus += rand(2, 5);

  const notaFinal = Math.min(100, notaBase + bonus);

  showFinalResult(notaFinal, acertos, selected.length, config.level);
}

function showFinalResult(nota, acertos, total, nivel) {
  document.getElementById("quiz-screen").classList.add("hidden");

  const end = document.getElementById("end-screen");
  end.classList.remove("hidden");

  const passou = nota >= 60;

  if (passou) {
    end.className = "end-screen win";
    end.innerHTML = `
      <h2>🎉 Você passou!</h2>
      <p>Nota final: <strong>${nota}</strong></p>
      <p>Nível da prova: <strong>${nivel}</strong></p>
      <p>Acertos: <strong>${acertos}/${total}</strong></p>
      <p>Conhecimento acumulado: <strong>${state.knowledge}</strong></p>
      <p style="margin-top: 16px; color: #94a3b8;">Parabéns! Você conseguiu balancear a semana e foi bem na prova.</p>
      <br>
      <button class="modal-btn primary" onclick="location.reload()">Jogar novamente</button>
    `;
  } else {
    end.className = "end-screen lose";
    end.innerHTML = `
      <h2>📚 Não foi dessa vez...</h2>
      <p>Nota final: <strong>${nota}</strong></p>
      <p>Nível da prova: <strong>${nivel}</strong></p>
      <p>Acertos: <strong>${acertos}/${total}</strong></p>
      <p>Conhecimento acumulado: <strong>${state.knowledge}</strong></p>
      <p style="margin-top: 16px; color: #94a3b8;">Tente equilibrar melhor sono, alimentação, estudo e lazer na próxima. Quanto menos você estuda, mais difícil fica a prova.</p>
      <br>
      <button class="modal-btn primary" onclick="location.reload()">Tentar de novo</button>
    `;
  }
}

function endGame(forceWin = null) {
  state.gameOver = true;
  document.getElementById("game").classList.add("hidden");

  const end = document.getElementById("end-screen");
  end.classList.remove("hidden");

  end.className = "end-screen lose";
  end.innerHTML = `
    <h2>Você não aguentou a semana...</h2>
    <p>Uma das barras chegou a zero.</p>
    <p>Conhecimento acumulado: <strong>${state.knowledge}</strong></p>
    <br>
    <button class="modal-btn primary" onclick="location.reload()">Tentar de novo</button>
  `;
}

updateUI();

/* ==================================================================== */
/* ====================  TELA DE ABERTURA (SPLASH)  =================== */
/* ==================================================================== */
(function () {
  const splash = document.getElementById("splash");
  if (!splash) return;

  const bg       = splash.querySelector(".splash-bg");
  const rings    = splash.querySelectorAll(".splash-ring");
  const floaters = splash.querySelector(".splash-floaters");
  const content  = splash.querySelector(".splash-content");
  const partBox  = document.getElementById("splashParticles");
  const title    = document.getElementById("splashTitle");
  const enterBtn = document.getElementById("splashEnter");
  const flashEl  = document.getElementById("splashFlash");

  const COLORS = ["#00f0ff", "#ff2d9b", "#ffd600", "#a78bfa"];
  const glowEl = document.getElementById("splashGlow");
  let entering = false;
  let pTimer = null, gTimer = null, sDelay = null;
  let rafPending = false, mx = 0, my = 0, lastTrail = 0;

  // libera o fill da animação de entrada p/ tilt e saída limpos
  setTimeout(() => { content.style.animation = "none"; }, 1500);

  /* ---- glitch RGB: fantasmas sempre on; este intervalo só dá o
     aperto extra de vez em quando ---- */
  gTimer = setInterval(() => {
    title.classList.add("glitching");
    setTimeout(() => title.classList.remove("glitching"), 520);
  }, rand(3000, 5600));

  /* ---- partículas neon subindo ---- */
  function spawnParticle() {
    const s = document.createElement("span");
    const size = rand(2, 7);
    const c = COLORS[rand(0, COLORS.length - 1)];
    s.style.width = s.style.height = size + "px";
    s.style.left = randf(0, 100) + "vw";
    s.style.background = c;
    s.style.boxShadow = "0 0 " + (size * 3) + "px " + c;
    s.style.animationDuration = randf(6, 13) + "s";
    s.style.animationDelay = randf(0, 1.4) + "s";
    partBox.appendChild(s);
    s.addEventListener("animationend", () => s.remove());
  }
  for (let i = 0; i < 24; i++) spawnParticle();
  pTimer = setInterval(spawnParticle, 220);

  /* ---- estrelas cadentes em loop ---- */
  function spawnShoot() {
    if (entering) return;
    const st = document.createElement("span");
    st.className = "shoot";
    st.style.left = randf(5, 78) + "vw";
    st.style.top = randf(2, 42) + "vh";
    st.style.width = rand(90, 180) + "px";
    st.style.setProperty("--sang", randf(-40, -12) + "deg");
    st.style.setProperty("--sdx", randf(38, 95) + "vw");
    st.style.setProperty("--sdy", randf(20, 52) + "vh");
    st.style.setProperty("--sdur", randf(0.9, 1.6) + "s");
    splash.appendChild(st);
    st.addEventListener("animationend", () => st.remove());
  }
  for (let i = 0; i < 3; i++) spawnShoot();
  (function scheduleShoots() {
    sDelay = setTimeout(() => {
      spawnShoot();
      scheduleShoots();
    }, rand(900, 2200));
  })();

  /* ---- parallax: mouse/toque desloca fundo, emojis, anéis e inclina o card ---- */
  splash.addEventListener("pointermove", (e) => {
    mx = (e.clientX / innerWidth - 0.5) * 2;
    my = (e.clientY / innerHeight - 0.5) * 2;

    // glow segue o cursor (fundo reativo)
    if (!entering && glowEl) {
      glowEl.style.left = e.clientX + "px";
      glowEl.style.top = e.clientY + "px";
    }

    // rastro de faíscas enquanto o mouse se move
    const now = performance.now();
    if (!entering && now - lastTrail > 85) {
      lastTrail = now;
      burstAt(e.clientX, e.clientY, 1);
    }

    if (!rafPending) {
      rafPending = true;
      requestAnimationFrame(applyParallax);
    }
  });

  function applyParallax() {
    rafPending = false;
    if (entering) return;
    bg.style.transform = "translate3d(" + (mx * 26) + "px," + (my * 18) + "px,0)";
    if (floaters) floaters.style.transform = "translate3d(" + (mx * 48) + "px," + (my * 36) + "px,0)";
    rings.forEach((r, i) => {
      r.style.translate = ((mx * -16) * (i + 1)) + "px " + ((my * -12) * (i + 1)) + "px";
    });
    content.style.transform = "rotateX(" + (-my * 4) + "deg) rotateY(" + (mx * 5) + "deg)";
  }

  /* ---- ação de clique em qualquer lugar: ripple + faíscas + kick no título ---- */
  splash.addEventListener("pointerdown", (e) => {
    if (entering) return;
    if (enterBtn.contains(e.target)) return; // o botão tem o próprio caminho
    rippleAt(e.clientX, e.clientY);
    burstAt(e.clientX, e.clientY, 10);
    title.classList.add("kick");
    setTimeout(() => title.classList.remove("kick"), 480);
  });

  function rippleAt(x, y) {
    const r = document.createElement("span");
    r.className = "ripple";
    const c = COLORS[rand(0, COLORS.length - 1)];
    r.style.left = x + "px";
    r.style.top = y + "px";
    r.style.setProperty("--rcol", hexA(c, 0.85));
    splash.appendChild(r);
    r.addEventListener("animationend", () => r.remove());
  }

  function burstAt(x, y, n) {
    for (let i = 0; i < n; i++) {
      const sp = document.createElement("span");
      const ang = randf(0, Math.PI * 2);
      const dist = randf(50, 150);
      const c = COLORS[rand(0, COLORS.length - 1)];
      sp.className = "spark";
      sp.style.left = x + "px";
      sp.style.top = y + "px";
      sp.style.background = c;
      sp.style.boxShadow = "0 0 10px " + c;
      sp.style.setProperty("--spx", (Math.cos(ang) * dist) + "px");
      sp.style.setProperty("--spy", (Math.sin(ang) * dist) + "px");
      sp.style.setProperty("--sdur", randf(0.55, 0.95) + "s");
      splash.appendChild(sp);
      sp.addEventListener("animationend", () => sp.remove());
    }
  }

  function hexA(hex, a) {
    const h = hex.replace("#", "");
    return "rgba(" + parseInt(h.slice(0, 2), 16) + "," + parseInt(h.slice(2, 4), 16) + "," + parseInt(h.slice(4, 6), 16) + "," + a + ")";
  }

  function flashOn() {
    flashEl.style.setProperty("--fxcol", hexA(COLORS[rand(0, COLORS.length - 1)], 0.85));
    flashEl.classList.remove("on");
    void flashEl.offsetWidth;
    flashEl.classList.add("on");
  }

  /* ---- ENTRAR: único caminho para o menu ---- */
  function pressEnter() {
    if (entering) return;
    entering = true;
    clearInterval(pTimer);
    clearInterval(gTimer);

    flashOn();
    const rect = enterBtn.getBoundingClientRect();
    burstAt(rect.left + rect.width / 2, rect.top + rect.height / 2, 18);

    content.style.animation = "none";
    content.style.transform = "";
    splash.classList.add("exit");

    setTimeout(() => {
      splash.remove();

      // reinicia a animação de entrada do menu principal
      const menu = document.querySelector(".start-menu .menu-content");
      if (menu) {
        menu.style.animation = "none";
        void menu.offsetWidth;
        menu.style.animation = "";
      }
    }, 800);
  }

  enterBtn.addEventListener("click", pressEnter);

  // Enter/Espaço = apertar o botão
  document.addEventListener("keydown", (e) => {
    if (!document.getElementById("splash")) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      e.stopPropagation();
      pressEnter();
    }
  });
})();