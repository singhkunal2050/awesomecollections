
'use client'
import URLList from './components/URLList'
import jsonData from '../../output.json';


export default function Home() {
  return (
    <main>
      <div className="container mx-auto px-4">
        <div className='text-center py-4'>
          <h2 class="text-2xl">Awesome Collections</h2>  
          <p className='w-[70ch] mx-auto'>Explore a vast repository of carefully selected GitHub repositories, each brimming with exceptional resources to enhance your programming skills, expand your knowledge base, and fuel your innovative projects. Whether you are a seasoned developer or just starting your coding adventure, this treasure trove of meticulously curated resources will equip you with the tools and insights you need to excel in the dynamic world of software development.</p>
        </div>
        <URLList repos={jsonData} />
      </div>
    </main>
  )
}
