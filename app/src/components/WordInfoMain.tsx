import React from 'react'

type WordInfoMainProps = {
    wordInfo: any,
    toggle: string,
    handleTermCallback: any
}

const WordInfoMain = (props:WordInfoMainProps) => {
  const data = props.wordInfo

  const handleWordClick = (word: string) => {
    // console.log(word)
    props.handleTermCallback(word);
  }

  const relationType = props.toggle;
  return (
    <div className='w-full h-auto flex flex-col gap-14 flex-grow'>
      <h1 className='text-6xl pl-1'>{data[0]}</h1>
      {Object.keys(data[1]).map((type) => (
        <div key={type} className='flex flex-col w-full gap-0'>
          {Object.keys(data[1][type]).map((meaning:string, index:number) => (
            <div key={meaning} id={`${type}${index}`} className='flex flex-col gap-2 py-7 last-of-type:pb-0'>
              <h2 className='flex text-3xl pl-1'>{type} as in {meaning}</h2>
                <div className='flex flex-col w-full py-4 px-2 border border-black rounded-lg gap-2'>
                  <h3 className='text-2xl mb-3 pl-1'>{relationType}</h3>
                  <div className='flex-wrap flex gap-7'>
                    {data[1][type][meaning][relationType].length === 0 && <h4 className='text-xl mb-3 pl-1 text-gray-400'>No {relationType} found</h4>}
                    {Object.keys(data[1][type][meaning][relationType]).map((strength) => (
                      <div key={strength} className='flex flex-col w-full'>
                        <h4 className='text-xl mb-3 pl-1'>{strength.slice(1)}</h4>
                        <div className='flex-wrap flex gap-4'>
                          {data[1][type][meaning][relationType][strength].map((word:string, index:number) => (
                            <div key={index}>
                              {props.toggle === "Synonyms" ? 
                                <span onClick={() => (handleWordClick(word))} className='text-xl border py-1 px-2 rounded-full hover:bg-green-200 hover:cursor-pointer active:bg-green-400 transition duration-100'>{word}</span>
                              : 
                                <span onClick={() => (handleWordClick(word))} className='text-xl border p-2 rounded-full hover:bg-red-200 hover:cursor-pointer active:bg-red-400 transition duration-100'>{word}</span>
                              }
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default WordInfoMain