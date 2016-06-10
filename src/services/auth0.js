import * as env from '../../env';
import Auth0Lock from 'react-native-lock';
import * as AuthStateActions from '../modules/auth/AuthState';
import store from '../redux/store';
const {Platform} = require('react-native');

const clientId = env.AUTH0_CLIENT_ID;
const domain = env.AUTH0_DOMAIN;
const authenticationEnabled = clientId && domain;

let lock = null;
if (authenticationEnabled) {
  lock = new Auth0Lock({
    clientId,
    domain
  });
} else {
  console.warn('Authentication not enabled: Auth0 configuration not provided');
}

export function showLogin() {
  if (!authenticationEnabled) {
    return;
  }

  const options = {
    closable: true
  };

  if (Platform.OS === 'ios') {
    lock.customizeTheme({
      A0ThemePrimaryButtonNormalColor: '#48BBEC',
      A0ThemePrimaryButtonHighlightedColor: '#08AFB3',
      A0ThemeSecondaryButtonTextColor: '#48BBEC',
      A0ThemeTextFieldTextColor: '#323232',
      A0ThemeTextFieldPlaceholderTextColor: '#808080',
      A0ThemeTextFieldIconColor: '#48BBEC',
      A0ThemeTitleTextColor: '#48BBEC',
      A0ThemeDescriptionTextColor: '#48BBEC',
      A0ThemeSeparatorTextColor: '#48BBEC',
      A0ThemeScreenBackgroundColor: '#F5FCFF',
      A0ThemeIconImageName: 'pepperoni',
      A0ThemeCredentialBoxBorderColor: '' //transparent
    });
  }

  lock.show(options, (err, profile, token) => {
    if (err) {
      store.dispatch(AuthStateActions.onUserLoginError(err));
      return;
    }

    // Authentication worked!
    store.dispatch(AuthStateActions.onUserLoginSuccess(profile, token));
  });
}
