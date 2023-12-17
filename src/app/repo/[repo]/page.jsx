'use client';
import useSWR from 'swr';
import MarkdownIt from 'markdown-it';
import githubPreamble from 'markdown-it-github-preamble';
import Link from 'next/link';
import hljs from 'highlight.js';

const fetcher = (url) => fetch(url).then((res) => res.json());

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (error) {
        console.error(error);
      }
    }
    return '';
  }
});

md.use(githubPreamble);

function RepoDetail({ params }) {
  const id = params.repo;
  const { data, error, isLoading } = useSWR(`/api/repo/${id}`, fetcher);

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;

  if (data) {
    console.log({ data });
  }

  return (
    <div className='container mx-auto p-4'>
      <section>
        <Link className='text-indigo-600 cursor-pointer' href={'/'}>Go Back</Link>
      </section>
      <section className='no-tailwind shadow-2xl m-2 p-4'>
        {data && <div dangerouslySetInnerHTML={{ __html: md.render(data.response.content) }} />}
      </section>
    </div>
  );
}

export default RepoDetail;
