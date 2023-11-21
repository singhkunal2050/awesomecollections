
'use client'
import URLList from './components/URLList'
import jsonData from '../../output.json';


export default function Home() {
  return (
    <main>
      <div className="">
        <div className='text-center py-4'>
          <h2 class="text-2xl">Awesome Collections</h2>  
        </div>
        <URLList repos={jsonData} />
      </div>
    </main>
  )
}
