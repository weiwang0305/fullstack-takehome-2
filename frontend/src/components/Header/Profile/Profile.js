import './Profile.css';

export const Profile = () => {
  return (
    <div className='profile-container'>
      <img
        src='notification.svg'
        alt='notification'
        width='24px'
        height='24px'
      />
      <div className='profile'>
        <p>0XFC...E63D1</p>
        <p>
          <img
            src='Vector.svg'
            width='8px'
            height='4px'
            alt='dropdown vector'
          />
        </p>
      </div>
    </div>
  );
};
