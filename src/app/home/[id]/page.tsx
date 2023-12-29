import React from 'react';

interface pageProps {
  params: { id: string };
  searchParams: { search: string };
}

const page: React.FC<pageProps> = ({ params, searchParams }) => {
  return (
    <div>
      {params.id} <br />
      {searchParams.search}

    </div>
  )
}

export default page