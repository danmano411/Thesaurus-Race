import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { WordInfoMain, Sidebar, GoalNav, WinScreen, Timer, CustomButton } from './components';

const App = () => {
  const [wordInfo, setWordInfo] = useState(null);
  const [term, setTerm] = useState('game');
  const [searchInput, setSearchInput] = useState('');
  const [toggle, setToggle] = useState("Synonyms")
  const [pathIsOpen, setPathIsOpen] = useState(false);

  const [startWord, setStartWord] = useState('game')
  const [goalWord, setGoalWord] = useState('game')
  const [goalWordInfo, setGoalWordInfo] = useState(null)
  
  const [numGenerated, setNumGenerated] = useState(0);
  const [winScreenIsOpen, setWinScreenIsOpen] = useState(false);
  const [transversed, setTransversed] = useState(0);
  const [path, setPath] = useState("")
  const [startTime, setStartTime] = useState(-1);
  const [totalTime, setTotalTime] = useState("");
  
  const [difficulty, setDifficulty] = useState<"Easy" | "Normal" | "Hard">("Hard");

  const searchBarRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    setTimeout(() => {
      handleGeneration();
    }, 500);
  }, [])

  useEffect(() => {
    axios.get(`/api/thesaurus?term=${term}`)
      .then((response: { data: React.SetStateAction<null>; }) => {
        setWordInfo(response.data);
        if (searchBarRef.current){
          searchBarRef.current.focus();
        }
        setToggle("Synonyms");
      })
      .catch((error: any) => {
        console.error('Error fetching Thesaurus data for term:', error);
        setTerm('error')
      });
  }, [term]);

  useEffect(() => {
    axios.get(`/api/thesaurus?term=${goalWord}`)
      .then((response: { data: React.SetStateAction<null>; }) => {
        setGoalWordInfo(response.data);
      })
      .catch((error: any) => {
        console.error('Error fetching Thesaurus data for goal word:', error);
        setGoalWord('error');
      });
  }, [goalWord]);

  const handleGeneration = () => {
    axios.get('/api/words')
      .then((response: { data: React.SetStateAction<any>; }) => {
        if (response.data){
          setTerm(response.data[0]);
          setStartWord(response.data[0]);
          setPath(response.data[0]);
          setGoalWord(response.data[1]);
          setNumGenerated(value => value+1);
          setTransversed(0);
          setStartTime(Date.now());
          setWinScreenIsOpen(false);
          // console.log("fired");
        }
      })
      .catch((error) => {
        console.error("Failed to Fetch Words")
        alert("Failed to Fetch Words " + error)
        setTerm('error')
      })
  }

  const handleInputChange = (event: { target: { value: string } }) => {
    if (event.target.value[(event.target.value).length - 1] !== "`"){
      setSearchInput(event.target.value);
    }
  };

  const handleEnter = (key: {code: string} ) => {
    if (key.code === "Enter"){
      setTerm(searchInput);
      setSearchInput("");
    }
  };

  const handleDificultyChange = () => {
    if (difficulty === "Easy")
      setDifficulty("Normal");
    else if (difficulty === "Normal")
      setDifficulty("Hard");
    else
      setDifficulty("Easy");
    handleGeneration();
  }

  const handleTypeToggle = () => {
    if (toggle === "Synonyms"){
      setToggle("Antonyms");
    }
    else {
      setToggle("Synonyms");
    }
  };

  onkeydown = (key: {code: string}) => {
    if (key.code === "ControlLeft"){
      handleTypeToggle();
    }
    else if (key.code === 'Backquote'){
      if (searchBarRef.current){
        searchBarRef.current.focus();
      }
      setSearchInput("");
    }
    else if (key.code === "AltRight"){
      setPathIsOpen(value => !value);
      // setWinScreenIsOpen(value => !value)
    }
    else if (key.code === "ControlRight"){
      handleGeneration();
    }
  };

  const termCallback = (t: string) => {
    setTerm(t);
    setSearchInput("");
    setTransversed(value => value + 1)
    setPath(value => value + " --> " + t)
    checkWin(t);
  };

  const checkWin = (t : string) => {
    if (numGenerated > 0 && t === goalWord){
      setWinScreenIsOpen(true);
      // console.log("WIN!!")
    }
  }

  const closeWinScreenCallback = () => {
    setWinScreenIsOpen(value => !value)
  }

  return (
    <div className='w-full'>
      <div className='grid grid-cols-5 w-full h-fit /px-[22rem] py-9 px-10 gap-10 mb-5 justify-between items-center bg-orange-100 border-b-2 border-b-black shadow-md'>
        {/* <input
          ref={searchBarRef}
          className='flex-shrink h-full border border-black rounded-full p-6 text-xl'
          type="text"
          value={searchInput}
          onKeyDown={handleEnter}
          onChange={handleInputChange}
          placeholder="Search for a term"
        /> */}
        
        <CustomButton 
          className={`flex-shrink py-2 px-10 rounded-2xl ${pathIsOpen ? 'bg-blue-400 text-white' : 'text-black bg-transparent'} border-blue-400  font-semibold border-2`}
          onClick={() => {setPathIsOpen(value => !value)}}
          text='Show Goal Definitions'
          helperText='Right Alt'
        />
        <h1 className='text-4xl w-full justify-center flex flex-col items-center'>Goal: {goalWord}</h1>
        <div className='flex flex-row w-full justify-center items-center'>
          {startTime !== -1 && <Timer startTime={startTime} active={!winScreenIsOpen} setTimeCallback={setTotalTime}/>}
        </div>
        <div className='flex flex-row justify-center items-center opacity-55'>
          <div 
            className='py-2 px-5 border-2 border-black rounded-md text-black bg-neutral-50 text-xl w-fit cursor-not-allowed'
            // className='py-2 px-5 border-2 border-black rounded-md text-black bg-neutral-50 hover:bg-neutral-200 active:bg-neutral-300 duration-100 transition text-xl w-fit cursor-pointer'
            // onClick={handleDificultyChange}
          >
            Difficulty: {difficulty}
          </div>
        </div>
        <CustomButton 
          className="flex-shrink py-2 px-10 rounded-2xl border-green-400 text-black font-semibold border-2"
          onClick={handleGeneration}
          text='New Game'
          helperText='Right Ctrl'
        />        
      </div>

      {wordInfo &&
       <>
          <div className='flex flex-row w-full pr-[20rem] pt-10 pb-14 relative gap-2'>
            <div className='flex-shrink w-[24rem] h-full max-h-screen sticky top-0 mt-32 overflow-auto overflow-x-hidden'>
                <Sidebar clickable={true} wordInfo={wordInfo}/>
            </div>
            <WordInfoMain 
              toggle={toggle} 
              wordInfo={wordInfo} 
              handleTermCallback={termCallback} 
              toggleBody={
                <CustomButton 
                  className="flex-shrink py-2 px-10 rounded-2xl border-red-400 text-red-400 font-semibold border-2"
                  onClick={handleTypeToggle}
                  text={`Toggle ${toggle}`}
                  helperText='Left Ctrl'
                />
              }
            />
          </div>
          { goalWordInfo && 
            <>
              <GoalNav isOpen={pathIsOpen} startWord={startWord} goalWord={goalWord} goalWordInfo={goalWordInfo}/>
            </>
          }
        </>
      }

      <WinScreen 
        isOpen={winScreenIsOpen} 
        startWord={startWord} 
        goalWord={goalWord} 
        time={totalTime}
        transversed={transversed} 
        difficulty={difficulty}
        closeCallback={closeWinScreenCallback} 
        path={path}
        generationCallback={handleGeneration}
      />

    </div>
  );
};

export default App;
