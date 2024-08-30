import { Component } from 'react';
// =============================================
import constants from '../../constants';
// =============================================
import styles from './Footer.module.sass';

class Footer extends Component {
  topFooterItemsRender = (item) => (
    <div key={item.title}>
      <h4>{item.title}</h4>
      {item.items.map((i) => (
        <a key={i} href="#">
          {i}
        </a>
      ))}
    </div>
  );

  topFooterRender() {
    return constants.FOOTER_ITEMS.map((item) => this.topFooterItemsRender(item));
  }

  render() {
    return (
      <div className={styles.footerContainer}>
        <div className={styles.footerTop}>
          <div>{this.topFooterRender()}</div>
        </div>
      </div>
    );
  }
}

export default Footer;
