import React, {useState, useEffect} from 'react';
import styles from './Carousel.module.scss'

// Response from fetch image from "https://picsum.photos/v2/list"
// [
//   {
//     "id": "0",
//     "author": "Alejandro Escamilla",
//     "width": 5000,
//     "height": 3333,
//     "download_url": "https://picsum.photos/id/0/5000/3333"
//   },
//   ...
// ]
const API = 'https://picsum.photos/v2/list';

async function fetchData(){

    try{
        const response = await fetch(API);
        const data = await response.json();
        return data;
    } catch(error){
        console.error(error);
    }
    
}
  

const Carousel = () => {
    const [images, setImages] = useState([]);
    const [viewingIndex, setViewingIndex] = useState(1);

    // const getData = async () => {
    //     const fetchedData = await fetchData()
    //     setImages(fetchedData)
    // }
    // getData();
    useEffect(() => {
        const getData = async () => {
            const promises = await Promise.all([fetchData()]);
            setImages(promises[0])
        }
        getData()
            
    },[])
console.log('imagesss', images)

    const handleLeft = () => {
        setViewingIndex((prev) => {
            const newIdx = prev - 1;
            if(newIdx < 0){
                return 0
            }
            return newIdx  
        })
    }
    const handleRight = () => {
        setViewingIndex((prev) => prev + 1)
    }

    return(
        <div>
            Carousel
            <div>
                <button onClick={handleLeft}>Left</button>
                <button onClick={handleRight}>Right</button>
            </div>
            <div className={styles.container}>
                <div className={styles.imgContainer} style={{transform: `translateX(${viewingIndex * 300 * -1}px)`, background: 'yellow', fontWeight: 500}}>
                    {images.map(({download_url}) => {
                        return (
                            <div>
                                <img src={download_url} alt={download_url}/>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Carousel