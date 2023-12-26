import React from 'react'

const page: React.FC = (props: any) => {
  return (
    <div>
        {props.params.id}
    </div>
  )
}

export default page