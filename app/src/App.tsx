import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { WordInfoMain, Sidebar, GoalNav, WinScreen, Timer } from './components';

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
          console.log("fired");
        }
      })
      .catch(() => {
        console.log("Failed to Fetch Words")
        setTerm('error')
      })
  }

  const handleInputChange = (event: { target: { value: string } }) => {
    if (event.target.value[(event.target.value).length - 1] !== "`"){
      setSearchInput(event.target.value);
    }
  };

  // const handleSearch = () => {
  //   setTerm(searchInput);
  // };

  const handleEnter = (key: {code: string} ) => {
    if (key.code === "Enter"){
      setTerm(searchInput);
      setSearchInput("");
    }
  };

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
      console.log("WIN!!")
    }
  }

  const closeWinScreenCallback = () => {
    setWinScreenIsOpen(value => !value)
  }

  return (
    <div className='w-full'>
      <div className='flex flex-row w-full h-14 /px-[22rem] py-16 gap-10 justify-center items-center'>
        <input
          ref={searchBarRef}
          className='flex-shrink h-full border border-black rounded-full p-6 text-xl'
          type="text"
          value={searchInput}
          onKeyDown={handleEnter}
          onChange={handleInputChange}
          placeholder="Search for a term"
        />
        <button className="flex-shrink py-2 px-10 rounded-2xl border-red-400 text-red-400 font-semibold border-2" onClick={handleTypeToggle}>Toggle (Left Ctrl)</button>
        <button className="flex-shrink py-2 px-10 rounded-2xl border-green-400 text-green-400 font-semibold border-2" onClick={handleGeneration}>Generate (Right Ctrl)</button>
        <button className={`flex-shrink py-2 px-10 rounded-2xl ${pathIsOpen ? 'bg-yellow-400 text-white' : 'text-yellow-400 bg-white'} border-yellow-400  font-semibold border-2`} onClick={() => {setPathIsOpen(value => !value)}}>Path (Right Alt)</button>
        {startTime !== -1 && <Timer startTime={startTime} active={!winScreenIsOpen} setTimeCallback={setTotalTime}/>}
      </div>

      {wordInfo &&
       <>
          <div className='flex flex-row w-full pr-[20rem] pt-10 pb-14 relative gap-2'>
            <div className='flex-shrink w-[24rem] h-full max-h-screen sticky top-0 mt-32 overflow-auto'>
                <Sidebar clickable={true} wordInfo={wordInfo}/>
            </div>
            <WordInfoMain toggle={toggle} wordInfo={wordInfo} handleTermCallback={termCallback} />
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
        difficulty="Normal" 
        closeCallback={closeWinScreenCallback} 
        path={path}
        generationCallback={handleGeneration}
      />

    </div>
  );
};

export default App;
