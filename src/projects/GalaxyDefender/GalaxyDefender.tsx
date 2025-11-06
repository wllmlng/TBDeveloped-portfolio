import { useEffect, useRef, useState } from 'react';
import styles from './GalaxyDefender.module.scss';
import { Game } from './gameLogic';
import menuShipImg from '../../assets/galaxydefender/images/ship/PlayerRed_Frame_01_Original.png';
import toggleOnImg from '../../assets/galaxydefender/audio/control/icons8-toggle-on-48.png';
import toggleOffImg from '../../assets/galaxydefender/audio/control/icons8-toggle-off-48.png';

const GalaxyDefender = () => {
  const backgroundCanvasRef = useRef<HTMLCanvasElement>(null);
  const mainCanvasRef = useRef<HTMLCanvasElement>(null);
  const shipCanvasRef = useRef<HTMLCanvasElement>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [musicMuted, setMusicMuted] = useState(false);
  const gameRef = useRef<Game | null>(null);

  useEffect(() => {
    if (gameStarted && backgroundCanvasRef.current && mainCanvasRef.current && shipCanvasRef.current) {
      const game = new Game(
        backgroundCanvasRef.current,
        mainCanvasRef.current,
        shipCanvasRef.current,
        setGameOver,
        setScore
      );
      gameRef.current = game;
      game.initialize();
      game.start();

      return () => {
        game.cleanup();
      };
    }
  }, [gameStarted]);

  const handleStart = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
  };

  const handleRestart = () => {
    if (gameRef.current) {
      gameRef.current.restart();
      setGameOver(false);
      setScore(0);
    }
  };

  const handleAudioControl = () => {
    if (gameRef.current) {
      gameRef.current.toggleMusic();
      setMusicMuted(!musicMuted);
    }
  };

  return (
    <div className={styles.bodyContainer}>
      <header className={styles.header}>
        <a href="#galaxy-defender">Galaxy Defender</a>
      </header>

      {!gameStarted && (
        <div className={styles.menu}>
          <img 
            src={menuShipImg} 
            alt="menu_ship" 
            width="190" 
            height="auto"
          />
          <div className={styles.instructions}>
            <button type="button" onClick={handleStart}>
              CLICK HERE TO START!
            </button>
            <div>HOW TO PLAY:</div>
            <div>CLICK SPACE TO SHOOT</div>
            <div>USE ARROW KEYS TO MOVE</div>
          </div>
        </div>
      )}

      <div className={styles.gameContainer}>
        <canvas 
          ref={backgroundCanvasRef} 
          id="background" 
          width="800" 
          height="650"
          className={styles.background}
        />
        <canvas 
          ref={mainCanvasRef} 
          id="main" 
          width="800" 
          height="650"
          className={styles.main}
        />
        <canvas 
          ref={shipCanvasRef} 
          id="ship" 
          width="800" 
          height="650"
          className={styles.ship}
        />
      </div>

      {gameOver && (
        <div className={styles.gameOver}>
          <div className={styles.gameOption}>
            <div className={styles.gameOverText}>GAME OVER</div>
            <button type="button" onClick={handleRestart}>
              Restart
            </button>
          </div>
        </div>
      )}

      {gameStarted && (
        <>
          <div className={styles.audioControl}>
            <button type="button" onClick={handleAudioControl}>
              Music
              <img 
                src={musicMuted ? toggleOffImg : toggleOnImg}
                width="25" 
                height="auto" 
                alt="volume control"
              />
            </button>
          </div>

          <div className={styles.score}>
            SCORE: <span>{score}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default GalaxyDefender;
