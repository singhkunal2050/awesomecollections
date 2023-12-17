
'use client'
import URLList from './components/URLList'
import jsonData from '../../output.json';
import { Farro } from 'next/font/google'
const farro = Farro({ subsets: ['latin'], weight: ["700"] })


export default function Home() {
  return (
    <main>
      <div className="container mx-auto px-4">
        <div class="github-ribbon">
          <a class="github-ribbon__link" target='_blank'
            href="https://github.com/singhkunal2050/awesomecollections"
            title="Star this on GitHub">
            Star this on GitHub
          </a>
        </div>
        <div className='text-center py-4 mt-[100px]'>
          <h2 className="text-2xl font-bold mb-4">
            <span className={`${farro.className} text-4xl`}>Awesome</span>  Collections</h2>
          <p className='max-w-[70ch] mx-auto'>Explore a vast repository of carefully selected GitHub repositories, each brimming with exceptional resources to enhance your programming skills, expand your knowledge base, and fuel your innovative projects. Whether you are a seasoned developer or just starting your coding adventure, this treasure trove of meticulously curated resources will equip you with the tools and insights you need to excel in the dynamic world of software development.</p>
        </div>
        <URLList repos={jsonData} />
      </div>
    </main>
  )
}
