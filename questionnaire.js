const questionnaireCopy={
  zh:{title:'六题个性化问卷',intro:'回答会影响五维雷达图：问卷占 70%，生日数字占 30%。',summaryLabel:'你的回答画像',summaryTitle:'当前更突出的能力：{primary} + {secondary}',summaryCopy:'这份结果把你的主动选择与生日文化坐标合并呈现。问卷代表你当下的自我认知，生日数字保留为文化参照。',mix:'权重：问卷 70% / 生日 30%',missing:'请先完成六题问卷。',questions:[
    ['你最自然的能量来源是什么？',['开新方向，连接新机会','把想法讲清楚，让别人被点燃','安静观察，等关键线索浮现']],
    ['做重要决定时，你更依赖什么？',['快速试错，边走边修正','标准、证据和边界','稳定计划与长期节奏']],
    ['你推进事情的方式更像哪一种？',['先搭框架，把事情落成系统','先找到人和资源，让局面动起来','先看全局，再选择最小动作']],
    ['别人通常怎样感受到你？',['有表达力，能带动气氛','可靠、有条理、能收尾','敏锐、清醒、能指出关键']],
    ['压力来时，你常见的反应是？',['立刻行动，先打开出口','收拢信息，重新判断优先级','维持节奏，稳住基本盘']],
    ['接下来最想发展的能力是？',['更大胆地开拓机会','更清晰地表达影响力','更稳定地构建长期成果']]
  ]},
  en:{title:'Six-question personal profile',intro:'Your answers shape the five-dimension radar: questionnaire 70%, birth-date pattern 30%.',summaryLabel:'Your response profile',summaryTitle:'Most visible abilities now: {primary} + {secondary}',summaryCopy:'This result blends your current self-description with the cultural coordinate from your birth date. Your answers lead the profile; the date remains a supporting cultural lens.',mix:'Weight: questionnaire 70% / birth date 30%',missing:'Please complete all six questions first.',questions:[
    ['What most naturally gives you energy?',['Opening new directions and connecting opportunities','Making ideas clear and energizing others','Observing quietly until key signals appear']],
    ['For important decisions, what do you rely on most?',['Fast experiments and correction through action','Standards, evidence and boundaries','Stable plans and long-term rhythm']],
    ['How do you usually move work forward?',['Build a structure and turn things into a system','Find people and resources so momentum begins','See the whole picture, then choose the smallest useful move']],
    ['How do people usually experience you?',['Expressive and able to lift the room','Reliable, orderly and able to finish','Sharp, clear and able to name the key issue']],
    ['Under pressure, what do you tend to do first?',['Act quickly to open a way out','Gather information and reset priorities','Keep the rhythm and stabilize the basics']],
    ['Which ability do you most want to grow next?',['Explore opportunities more boldly','Express influence more clearly','Build long-term results more steadily']]
  ]},
  es:{title:'Perfil personal de seis preguntas',intro:'Tus respuestas moldean el radar de cinco dimensiones: cuestionario 70%, fecha de nacimiento 30%.',summaryLabel:'Perfil de tus respuestas',summaryTitle:'Capacidades más visibles ahora: {primary} + {secondary}',summaryCopy:'El resultado combina tu autodescripción actual con la coordenada cultural de tu fecha. Las respuestas lideran el perfil; la fecha queda como referencia cultural.',mix:'Peso: cuestionario 70% / fecha 30%',missing:'Completa primero las seis preguntas.',questions:[
    ['¿Qué te da energía de forma más natural?',['Abrir nuevas direcciones y conectar oportunidades','Explicar ideas y activar a otros','Observar en silencio hasta ver las señales clave']],
    ['Para decisiones importantes, ¿en qué confías más?',['Experimentos rápidos y ajustes en acción','Estándares, evidencia y límites','Planes estables y ritmo de largo plazo']],
    ['¿Cómo sueles impulsar las cosas?',['Construir estructura y convertirlo en sistema','Encontrar personas y recursos para crear movimiento','Ver el conjunto y elegir el movimiento mínimo útil']],
    ['¿Cómo suelen percibirte los demás?',['Expresivo y capaz de elevar el ambiente','Fiable, ordenado y capaz de cerrar','Perspicaz, claro y capaz de nombrar lo esencial']],
    ['Bajo presión, ¿qué haces primero?',['Actuar rápido para abrir una salida','Reunir información y redefinir prioridades','Mantener el ritmo y estabilizar lo básico']],
    ['¿Qué capacidad quieres desarrollar ahora?',['Explorar oportunidades con más valentía','Expresar influencia con más claridad','Construir resultados duraderos con más estabilidad']]
  ]}
};

const questionnaireWeights=[
  [[3,1,0,0,0],[0,3,0,0,1],[0,0,0,1,3]],
  [[2,0,0,0,2],[0,0,1,3,1],[0,0,3,1,0]],
  [[0,0,3,2,0],[3,1,1,0,0],[1,0,0,2,3]],
  [[0,3,0,0,1],[0,0,3,1,0],[0,0,0,3,2]],
  [[3,1,0,0,1],[0,0,1,3,2],[0,0,3,1,0]],
  [[3,0,0,1,1],[0,3,0,1,0],[0,0,3,1,0]]
];

function questionnaireLang(){return typeof lang==='string'?lang:'zh'}
function renderQuestionnaire(){
  const copy=questionnaireCopy[questionnaireLang()],box=document.querySelector('#talent-questionnaire');
  if(!box)return;
  const previous=[...box.querySelectorAll('input:checked')].map(input=>input.value);
  box.innerHTML=`<legend id="questionnaire-title">${copy.title}</legend><p class="questionnaire-intro">${copy.intro}</p><div class="questionnaire-grid"></div>`;
  const grid=box.querySelector('.questionnaire-grid');
  copy.questions.forEach((question,questionIndex)=>{
    const card=document.createElement('div');
    card.className='questionnaire-card';
    card.innerHTML=`<h4>${questionIndex+1}. ${question[0]}</h4><div class="questionnaire-options"></div>`;
    const options=card.querySelector('.questionnaire-options');
    question[1].forEach((answer,answerIndex)=>{
      const value=`${questionIndex}-${answerIndex}`,id=`talent-q${questionIndex}-a${answerIndex}`,label=document.createElement('label');
      label.innerHTML=`<input id="${id}" type="radio" name="talent-q${questionIndex}" value="${value}" required><span>${answer}</span>`;
      options.appendChild(label);
    });
    grid.appendChild(card);
  });
  previous.forEach(value=>{const input=box.querySelector(`input[value="${value}"]`);if(input)input.checked=true});
}

function getQuestionnaireScores(){
  const totals=[0,0,0,0,0],answers=[];
  for(let questionIndex=0;questionIndex<questionnaireWeights.length;questionIndex++){
    const selected=document.querySelector(`input[name="talent-q${questionIndex}"]:checked`);
    if(!selected)return null;
    const answerIndex=Number(selected.value.split('-')[1]),weights=questionnaireWeights[questionIndex][answerIndex];
    weights.forEach((value,index)=>totals[index]+=value);
    answers.push(answerIndex);
  }
  const scores=totals.map(value=>Math.min(96,Math.round(50+value/12*46)));
  return{scores,answers,totals};
}

function blendQuestionnaireScores(baseScores){
  const profile=getQuestionnaireScores();
  if(!profile)return baseScores;
  return baseScores.map((score,index)=>Math.round(score*.3+profile.scores[index]*.7));
}

function renderQuestionnaireSummary(result,t){
  const summary=document.querySelector('#questionnaire-summary'),profile=getQuestionnaireScores();
  if(!summary||!profile){if(summary)summary.innerHTML='';return}
  const copy=questionnaireCopy[questionnaireLang()],ranking=result.scores.map((score,index)=>({score,index})).sort((a,b)=>b.score-a.score||a.index-b.index);
  const title=copy.summaryTitle.replace('{primary}',t.axes[ranking[0].index]).replace('{secondary}',t.axes[ranking[1].index]);
  const tags=ranking.slice(0,3).map(item=>`<span>${t.axes[item.index]} ${item.score}</span>`).join('');
  summary.innerHTML=`<small>${copy.summaryLabel}</small><h4>${title}</h4><p>${copy.summaryCopy}</p><div class="questionnaire-tags">${tags}<span>${copy.mix}</span></div>`;
}

window.TalentQuestionnaire={render:renderQuestionnaire,blend:blendQuestionnaireScores,renderSummary:renderQuestionnaireSummary};
document.querySelectorAll('[data-lang]').forEach(button=>button.addEventListener('click',renderQuestionnaire));
renderQuestionnaire();
