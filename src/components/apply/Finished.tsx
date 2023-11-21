import React from "react";

const Finished: React.FC = () => {
  return (
    <div className='flex h-screen w-full  flex-col items-center justify-center'>
      <div className='m-19 w-1/2 rounded-lg bg-white p-10 shadow-2xl'>
        <p>
          You have successfully finished the submition process. We will let you
          know about further process through email. Best wishes.
        </p>
      </div>
    </div>
  );
};

export default Finished;
