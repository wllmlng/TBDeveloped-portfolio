//External Libraries
import React, {useState} from 'react';
import Anthropic from '@anthropic-ai/sdk';
//Api Calls

//Utils

//Hooks

//Components

//Types

//Constants

//Styles
import styles from './AiAnalyzer.module.scss'

//-----------------End Imports-----------------

interface Props { 
    setLoading: (loading: boolean) => void;
}

const mockResults = `🚨 <strong>Error Patterns:</strong><br />
<strong>1. Most Common Errors:</strong><br />
- <strong>ERR_NOT_FOUND (404):</strong> Mainly on "/a/f" - this path is playing hide and seek! 🙈<br />
- <strong>ERR_RATE_LIMIT (429):</strong> Someone's being too eager! 🏃‍♂️<br />
- <strong>ERR_HTTP2_ERROR (500):</strong> Technical difficulties, please stand by! 🔧<br />
- <strong>ERR_ACCESS_DENIED:</strong> You shall not pass! 🧙‍♂️<br />
`;

function AiAnalyzer({setLoading}: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const [analysis, setAnalysis] = useState('');

    const analyzeDataWithAI = async () => {
        setLoading(true);
        //!Simulated api
        setTimeout(() => {
            setAnalysis(mockResults); 
            setLoading(false);
            openModal();
         }, 3000)
        // try {
        //     const analysisRequest = {
        //         data: mockData,
        //         prompt: "Analyze the following data for trends and patterns. Identify ONLY problematic paths causing bad status codes. Use <strong /> for bolding text and <br /> to break lines in response. Return the common error messages in the results. Keep response professional, short and consice. Use emojis to highlight headings.",
        //     };
        
        //     const anthropic = new Anthropic({
        //         apiKey: process.env.REACT_APP_ANTHROPIC_API_KEY, 
        //         dangerouslyAllowBrowser: true
        //     });
        
        //     const response = await anthropic.messages.create({
        //         model: "claude-3-5-sonnet-20241022",
        //         max_tokens: 1000,
        //         temperature: 0.5, 
        //         system: "Analyze the data and provide insights.",
        //         messages: [
        //         {
        //             role: "user",
        //             content: [
        //             {
        //                 type: "text",
        //                 text: JSON.stringify(analysisRequest) 
        //             }
        //             ]
        //         }
        //         ]
        //     });
        
        //     setAnalysis(response.content[0].text); 
        //     openModal();
        // } catch (err) {
        //     console.log(err)
        //     setAnalysis(mockResults);
        // } finally {
        //     setLoading(false);
        // }
    };

    return (
        <>
            <button className={styles.fancyButton} onClick={analyzeDataWithAI}>Find Patterns</button>
            {isModalOpen && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <button className={styles.closeButton} onClick={closeModal}>X</button>
                        <div dangerouslySetInnerHTML={{ __html: analysis }} />
                    </div>
                </div>
            )}
        </>
    )
}

export default AiAnalyzer