import React from 'react'

const EmailSent = ({label}:{label:string}) => {
  return (
    <div className='border border-green-300 bg-green-50 rounded-lg p-4 opacity-70 mb-3 text-center dark:bg-green-200 dark:bg-opacity-50 font-semibold dark:text-white'>
        {`A verification link has been sent to your email address, click on the link to ${label}.`}
    </div>
  )
}

export default EmailSent