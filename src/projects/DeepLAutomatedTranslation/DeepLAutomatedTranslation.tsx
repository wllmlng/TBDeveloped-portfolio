//External Libraries
import  {useMemo, useEffect, useState} from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next'
// import * as deepl from 'deepl-node';


//Api Calls

//Utils

//Hooks

//Components

//Types

//Constants

//Styles

//-----------------End Imports-----------------

function DeepLAutomatedTranslation() {
    const { t } = useTranslation()
    const [input, setInput ] = useState('')
    // const deepLApiKey = import.meta.env.VITE_DEEPL_API


    const translateText = async (text: string, targetLang: string) => {
        try {
          const response = await fetch('http://localhost:8000/translate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              source_lang: 'EN', // Optional — can be removed if you want auto-detection
              text,
              target_lang: targetLang,
            }),
          });
      
          const data = await response.json();
          console.log('Translated text:', data.translations?.[0]?.text);
          alert(data.translations?.[0]?.text ?? "")
          return data.translations?.[0]?.text;
        } catch (error) {
          console.error('Translation failed:', error);
          alert("Failed to translate")
          return null;
        }
      };
      

      


    return (
        <div>
            <h1>{t('translate')}</h1>
            <input onChange={(e)=>setInput(e.target.value)}/>
            <button disabled={!input.length} onClick={()=>translateText(input, "ES")}>Translate to ES</button>
        </div>
    )
}

export default DeepLAutomatedTranslation