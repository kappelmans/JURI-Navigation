import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneLink,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart, IWebPartPropertiesMetadata } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'JuriNavigationWebPartStrings';
import JuriNavigation from './components/JuriNavigation';
import { IJuriNavigationProps } from './components/IJuriNavigationProps';
                 
export interface IJuriNavigationdWebPartProps {
  json_input:string;
  description:string;
}

export default class JuriNavigationWebPart extends BaseClientSideWebPart<IJuriNavigationdWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';

  protected onInit(): Promise<void> {
    this._environmentMessage = this._getEnvironmentMessage();

    return super.onInit();
  }

  protected get propertiesMetadata(): IWebPartPropertiesMetadata {
    return {
      'title': { isSearchablePlainText: true },
      'intro': { isHtmlString: true },
      'image': { isImageSource: true },
      'url': { isLink: true }
    };
  }

  public render(): void {
    const element: React.ReactElement<IJuriNavigationProps> = React.createElement(
      JuriNavigation,
      {
        json_input: this.properties.json_input,
        description: this.properties.description,
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName
      }
    );

    ReactDom.render(element, this.domElement);
  }

  private _getEnvironmentMessage(): string {
    if (!!this.context.sdks.microsoftTeams) { // running in Teams
      return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
    }

    return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment;
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const {
      semanticColors
    } = currentTheme;
    this.domElement.style.setProperty('--bodyText', semanticColors.bodyText);
    this.domElement.style.setProperty('--link', semanticColors.link);
    this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered);

  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          /*header: {
            description: strings.Description
          },*/
          groups: [
            {
              /*groupName: strings.BasicGroupName,*/
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.Description
                }),
                PropertyPaneTextField('json_input', {
                  label: strings.JsonInput
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
