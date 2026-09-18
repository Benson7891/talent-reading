(function(){
  const note=document.querySelector('#algorithm-note');
  if(!note)return;
  const text='九数系统将出生日期数字逐位相加，并反复化简到 1—9。结果用于文化探索和自我反思，不自动推断疾病、创伤、财富或命运。';
  new MutationObserver(()=>{if(note.textContent!==text)note.textContent=text}).observe(note,{childList:true,characterData:true,subtree:true});
})();
