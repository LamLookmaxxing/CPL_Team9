import React from 'react';

function Footer() {
  return (
    <footer style={{ position: 'fixed', bottom: 0, width: '100%', background: 'linear-gradient(#485563, #29323c)', textAlign: 'center', padding: '15px', boxShadow: '0 5px 5px 5px rgba(0,0,0,0.4)', zIndex: 999, color: '#fff', fontSize: '1.5rem' }}>
    <a target="_blank"  style={{ color: '#fff', textDecoration: 'none' }}>
        <i className="ion-social-github"></i>&nbsp;&nbsp;Fork on GitHub
    </a>
</footer>



  );
}

export default Footer;