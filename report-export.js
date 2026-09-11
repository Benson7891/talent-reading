(function(){
  const copy={
    zh:{label:'个人天赋报告',button:'保存为 PDF',hint:'在系统界面中选择“存储为 PDF”或“保存到文件”'},
    en:{label:'Personal Talent Report',button:'Save as PDF',hint:'Choose “Save as PDF” in the system print dialog'},
    es:{label:'Informe personal de talento',button:'Guardar como PDF',hint:'Elige “Guardar como PDF” en el diálogo del sistema'}
  };
  function currentLanguage(){const value=document.documentElement.lang||'zh-CN';return value.startsWith('en')?'en':value.startsWith('es')?'es':'zh'}
  function updateExportHeader(){const language=currentLanguage(),birth=document.querySelector('#birth')?.value||'';document.querySelector('#export-report-label').textContent=copy[language].label;document.querySelector('#save-pdf-button').textContent=copy[language].button;document.querySelector('#save-pdf-button').title=copy[language].hint;document.querySelector('#export-report-date').textContent=birth}
  document.querySelector('#save-pdf-button')?.addEventListener('click',()=>{updateExportHeader();const oldTitle=document.title,birth=document.querySelector('#birth')?.value||'';document.title=`${copy[currentLanguage()].label}${birth?`-${birth}`:''}`;window.print();setTimeout(()=>{document.title=oldTitle},500)});
  document.querySelectorAll('[data-lang]').forEach(button=>button.addEventListener('click',updateExportHeader));
  document.querySelector('#birth')?.addEventListener('change',updateExportHeader);
  updateExportHeader();
  window.TalentReportExport={update:updateExportHeader};
})();
