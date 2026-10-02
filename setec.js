const state = {
  day: 1,
  hour: 7,
  sono: 70,
  comida: 70,
  estudo: 0,
  lazer: 60,
  knowledge: 0,
  effects: [],
  gameOver: false
};

const dayNames = ["", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira"];

const quizQuestions = [
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
    question: "Qual o principal objetivo de 'Vencendo a Semana'?",
    options: [
      "Zerar todas as barras",
      "Passar na prova balanceando sono, alimentação, estudo e lazer",
      "Só estudar o máximo possível",
      "Gastar todo o tempo em redes sociais"
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
  if (h >= 7 && h < 12) return 1.15;
  if (h >= 12 && h < 18) return 1.0;
  if (h >= 18 && h < 23) return 0.9;
  return 0.7;
}

function getSonoMod() {
  if (state.sono >= 60) return 1.0;
  if (state.sono >= 40) return 0.85;
  if (state.sono >= 20) return 0.6;
  return 0.5;
}

function getComidaMod() {
  if (state.comida >= 50) return 1.0;
  if (state.comida >= 30) return 0.9;
  return 0.75;
}

function getLazerMod() {
  if (state.lazer >= 40) return 1.0;
  if (state.lazer >= 20) return 0.9;
  return 0.7;
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

  if (state.sono <= 15 || state.comida <= 15 || state.lazer <= 10) {
    face.textContent = "😵";
    status.textContent = "Estado crítico!";
    character.classList.add("critical");
  }
  else if (state.sono <= 30) {
    face.textContent = "😴";
    status.textContent = "Muito cansado...";
    character.classList.add("tired");
  }
  else if (state.comida <= 30) {
    face.textContent = "🤢";
    status.textContent = "Precisa comer";
    character.classList.add("hungry");
  }
  else if (state.lazer <= 25) {
    face.textContent = "😩";
    status.textContent = "Quase em burnout";
    character.classList.add("burnout");
  }
  else if (state.estudo >= 70) {
    face.textContent = "🤓";
    status.textContent = "Muito focado nos estudos";
    character.classList.add("focused");
  }
  else if (state.sono >= 70 && state.comida >= 60 && state.lazer >= 50) {
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
      state.sono = clamp(state.sono + 70);
      state.lazer = clamp(state.lazer + 12);
      state.comida = clamp(state.comida - 10);
      addLog("Você dormiu 8 horas. Acordou bem recuperado.");
    }
  },
  dormir6: {
    hours: 6,
    run() {
      state.sono = clamp(state.sono + 48);
      state.lazer = clamp(state.lazer + 5);
      state.comida = clamp(state.comida - 8);
      addLog("Dormiu 6 horas. Melhor que nada.");
    }
  },
  cochilo: {
    hours: 2,
    run() {
      state.sono = clamp(state.sono + 25);
      state.comida = clamp(state.comida - 3);
      addLog("Cochilo de 2 horas. Um pouco mais descansado.");
    }
  },
  refeicao: {
    hours: 2,
    run() {
      state.comida = clamp(state.comida + 55);
      addEffect("Foco Alimentar", true);
      addLog("Refeição balanceada. Você se sente bem e focado.");
    }
  },
  fastfood: {
    hours: 1,
    run() {
      state.comida = clamp(state.comida + 38);
      addEffect("Letargia");
      addLog("Fast-food... rápido, mas pesado. Letargia ativada.");
    }
  },
  cafe: {
    hours: 1,
    run() {
      addEffect("Cafeína", true);
      state._cafeCrash = 2;
      addLog("Café tomado! Energia temporária. Cuidado com o crash.");
    }
  },
  estudar2: {
    hours: 2,
    run() {
      const ganho = Math.round(14 * getSonoMod() * getComidaMod() * getLazerMod() * getHourModifier());
      state.estudo = clamp(state.estudo + ganho);
      state.knowledge = state.estudo;
      state.sono = clamp(state.sono - 7);
      state.lazer = clamp(state.lazer - 9);
      state.comida = clamp(state.comida - 5);
      addLog(`Estudou 2 horas. +${ganho} de conhecimento.`);
    }
  },
  revisao: {
    hours: 1,
    run() {
      const ganho = Math.round(8 * getSonoMod() * getComidaMod() * getLazerMod() * getHourModifier());
      state.estudo = clamp(state.estudo + ganho);
      state.knowledge = state.estudo;
      state.sono = clamp(state.sono - 3);
      state.lazer = clamp(state.lazer - 4);
      state.comida = clamp(state.comida - 2);
      addLog(`Revisão rápida. +${ganho} de conhecimento.`);
    }
  },
  grupo: {
    hours: 3,
    run() {
      const ganho = Math.round(18 * getSonoMod() * getComidaMod() * getLazerMod() * getHourModifier());
      state.estudo = clamp(state.estudo + ganho);
      state.knowledge = state.estudo;
      state.sono = clamp(state.sono - 8);
      state.lazer = clamp(state.lazer + 14);
      state.comida = clamp(state.comida - 6);
      addLog(`Grupo de estudos. +${ganho} de conhecimento + lazer social.`);
    }
  },
  passeio: {
    hours: 2,
    run() {
      state.lazer = clamp(state.lazer + 32);
      state.sono = clamp(state.sono + 3);
      state.comida = clamp(state.comida - 4);
      addLog("Passeio / hobby. Lazer de qualidade!");
    }
  },
  serie: {
    hours: 2,
    run() {
      state.lazer = clamp(state.lazer + 20);
      state.sono = clamp(state.sono - 2);
      state.comida = clamp(state.comida - 4);
      addLog("Série assistida. Relaxe um pouco.");
    }
  },
  redes: {
    hours: 1,
    run() {
      let ganho = 7;
      if (Math.random() < 0.4) {
        ganho = 3;
        addEffect("Feed Infinito");
        state.hour += 1;
        addLog("Você caiu no Feed Infinito... perdeu tempo extra.");
      } else {
        addLog("Scroll nas redes. Lazer baixo.");
      }
      state.lazer = clamp(state.lazer + ganho);
      state.sono = clamp(state.sono - 2);
      state.comida = clamp(state.comida - 2);
    }
  }
};

function doAction(name) {
  if (state.gameOver) return;

  const action = actions[name];
  if (!action) return;

  state.hour += action.hours;
  state.comida = clamp(state.comida - action.hours * 1.8);
  state.sono = clamp(state.sono - action.hours * 1.3);

  action.run();

  if (state._cafeCrash !== undefined) {
    state._cafeCrash--;
    if (state._cafeCrash <= 0) {
      removeEffect("Cafeína");
      addEffect("Crash de Cafeína");
      state.sono = clamp(state.sono - 14);
      addLog("Crash de cafeína! Você se sente drenado.");
      delete state._cafeCrash;
    }
  }

  checkStatus();

  if (Math.random() < 0.25 && state.hour < 28) {
    triggerEvent();
  }

  if (state.hour >= 30) {
    endDay();
  }

  updateUI();
  checkGameOver();
}

function checkStatus() {
  if (state.sono <= 20) addEffect("Névoa Mental");
  else removeEffect("Névoa Mental");

  if (state.lazer <= 10) addEffect("Burnout");
  else removeEffect("Burnout");

  if (state.comida <= 15) addEffect("Fome");
  else removeEffect("Fome");
}

const events = [
  {
    title: "Convite para ranked",
    text: "Seus amigos te chamaram para jogar. Vai topa?",
    choices: [
      {
        label: "Aceitar (+Lazer, –Sono)",
        effect() {
          state.lazer = clamp(state.lazer + 22);
          state.sono = clamp(state.sono - 15);
          state.hour += 2;
          addLog("Você jogou. Diversão garantida, sono prejudicado.");
        }
      },
      {
        label: "Recusar",
        effect() {
          state.lazer = clamp(state.lazer - 4);
          addLog("Você recusou o convite.");
        }
      }
    ]
  },
  {
    title: "Mensagem do grupo",
    text: "O grupo de trabalho mandou mensagem pedindo ajuda. O que fazer?",
    choices: [
      {
        label: "Responder agora (+Estudo, –Sono)",
        effect() {
          state.estudo = clamp(state.estudo + 7);
          state.knowledge = state.estudo;
          state.sono = clamp(state.sono - 8);
          addLog("Você ajudou o grupo. +conhecimento, –sono.");
        }
      },
      {
        label: "Deixar para depois",
        effect() {
          addLog("Você deixou para depois.");
        }
      }
    ]
  },
  {
    title: "Mais café?",
    text: "Você está cansado. Tomar mais café?",
    choices: [
      {
        label: "Tomar (energia + crash)",
        effect() {
          addEffect("Cafeína", true);
          state._cafeCrash = 2;
          addLog("Mais café! Energia subindo...");
        }
      },
      {
        label: "Não tomar",
        effect() {
          addLog("Você resistiu ao café.");
        }
      }
    ]
  },
  {
    title: "Amigo chamou para sair",
    text: "Um amigo quer te encontrar. Aceita?",
    choices: [
      {
        label: "Aceitar (+Lazer)",
        effect() {
          state.lazer = clamp(state.lazer + 28);
          state.hour += 2;
          state.comida = clamp(state.comida - 5);
          addLog("Saída com amigo. Lazer de qualidade!");
        }
      },
      {
        label: "Ficar estudando",
        effect() {
          state.estudo = clamp(state.estudo + 5);
          state.knowledge = state.estudo;
          state.lazer = clamp(state.lazer - 6);
          addLog("Você priorizou os estudos.");
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

  state.sono = clamp(state.sono + 6);
  state.comida = clamp(state.comida - 8);

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

function startQuiz() {
  state.gameOver = true;
  document.getElementById("game").classList.add("hidden");
  
  const quizScreen = document.getElementById("quiz-screen");
  quizScreen.classList.remove("hidden");

  const container = document.getElementById("quiz-container");
  container.innerHTML = "";

  quizQuestions.forEach((q, index) => {
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
  let acertos = 0;

  quizQuestions.forEach((q, index) => {
    const selected = document.querySelector(`input[name="q${index}"]:checked`);
    if (selected && parseInt(selected.value) === q.correct) {
      acertos++;
    }
  });

  const pontosQuiz = acertos * 8;
  const notaFinal = Math.min(100, Math.round(state.knowledge * 0.6 + pontosQuiz));

  let bonus = 0;
  if (state.sono >= 50) bonus += 3;
  if (state.comida >= 50) bonus += 3;
  if (state.lazer >= 40) bonus += 4;

  const notaComBonus = Math.min(100, notaFinal + bonus);

  showFinalResult(notaComBonus, acertos);
}

function showFinalResult(nota, acertos) {
  document.getElementById("quiz-screen").classList.add("hidden");
  
  const end = document.getElementById("end-screen");
  end.classList.remove("hidden");

  const passou = nota >= 60;

  if (passou) {
    end.className = "end-screen win";
    end.innerHTML = `
      <h2>🎉 Você passou!</h2>
      <p>Nota final: <strong>${nota}</strong></p>
      <p>Acertos no teste: <strong>${acertos}/5</strong></p>
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
      <p>Acertos no teste: <strong>${acertos}/5</strong></p>
      <p>Conhecimento acumulado: <strong>${state.knowledge}</strong></p>
      <p style="margin-top: 16px; color: #94a3b8;">Tente equilibrar melhor sono, alimentação, estudo e lazer na próxima.</p>
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