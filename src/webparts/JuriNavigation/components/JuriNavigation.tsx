import * as React from 'react';
import styles from './JuriNavigation.module.scss';
import { IJuriNavigationProps } from './IJuriNavigationProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPersonDigging } from '@fortawesome/free-solid-svg-icons';

export default class JuriNavigation extends React.Component<IJuriNavigationProps, {}> {

  public renderJsonPage(jsonString:string){
    try{
      let jsonData = JSON.parse(jsonString);

      return jsonData['list'].map( el =>{
        return (
          <div className={`${styles.blok}`}>
            <div className={`${styles.blokheader}`}>
            <h2>{el.title}</h2>
            </div>
            <section className={`${styles.row}`}>
              <>{this.renderJsonList(el.links)}</>    
            </section>
          </div>
        );
      });
    }
    catch(e){
      return <p>{e.message} - {jsonString} </p>;
    }  
  }

  public renderJsonList(linksList:Array<object>){
    
    let assetUrls = {
        "powerBi":require('../assets/power_bi.png'),
        "excel":require('../assets/excel.png'),
        "sharepoint":require('../assets/sharepoint.png'),
        "basic-juri": require('../assets/basic-juri.png'),
        "pregis": require('../assets/pregis.png'),
        "timaster": require('../assets/timaster.png') 
        
    };

    return linksList.map( el =>{
      return (
          <div className={`${styles.item}`}>
          <a className={el['disabled'] &&`${styles.link_disabled}`}  href={escape(el['target_url'])} target='_blank'>
            <div>
              <img alt="" src={escape(el['image_url'] ? el['image_url'] : assetUrls[el['asset_url']] ? assetUrls[el['asset_url']]: 'https://lan.juri.be/images/basic-juri.png')} className={styles.juri_bol} />
            </div>
						<p><strong>{el['title']}</strong></p>
          </a>
          </div>
      );
    });
  }

  public render(): React.ReactElement<IJuriNavigationProps> {
    const {
      json_input,
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName
    } = this.props;

    return (
      <div>        
        <h1>{description}</h1>
      <section className={`${styles.row}`}>
            <>{this.renderJsonPage(json_input)}</>
      </section>
      </div>
    );
  }
}
