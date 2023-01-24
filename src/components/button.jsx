function Button({name}) {
    const imgPath = `../public/logo-${name}.jpg` 
    const linkButton = ''

  return (
    <div className={`button${name}`}>        
        <img src={imgPath} className="App-logo" alt={`${name} logo`} />
        <a
          href="https://reactjs.org"
          target={linkButton}
        >
          {name}
        </a>
    </div>
  );
}

export default Button;
