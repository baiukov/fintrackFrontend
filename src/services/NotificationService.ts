import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import Constants from 'expo-constants';
import { Service } from './Service';
import { useStore } from '../storage/store';
import { User } from '../model/User';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

interface StoreState {
  user: User | null;
  language: {
    LANGUAGE_NAME: string;
  };
}

class NotificationService extends Service {
  protected static instance: NotificationService | null = null;
  protected baseUrl: string = Constants.expoConfig?.extra?.env?.API_URL + '/analytics';

  private constructor() {
    super();
  }

  public static getInstance(): NotificationService {
    if (NotificationService.instance === null) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  private getCurrentUser(): User {
    const state = useStore.getState() as StoreState;
    const user = state.user;
    if (!user || !user.id) {
      throw new Error('User not authenticated');
    }
    return user;
  }

  private getCurrentLanguage(): string {
    const state = useStore.getState() as StoreState;
    return state.language.LANGUAGE_NAME.toLowerCase();
  }

  async registerForPushNotifications() {
    try {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        throw new Error('Permission not granted for notifications');
      }

      const token = await Notifications.getExpoPushTokenAsync({
        projectId: '761197c6-011e-496b-a41d-a783643f7fd1',
      });

      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }

      return token;
    } catch (error) {
      console.error('Error registering for push notifications:', error);
      return null;
    }
  }

  async scheduleDailyAnalytics(accountId: string) {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();

      const user = this.getCurrentUser();
      const language = this.getCurrentLanguage();

      const adviceRes = await this.api.get<string>(`/analyze`, {
        params: {
          accountId,
          userId: user.id,
          language
        }
      });

      const advice = adviceRes.data;

      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Daily Financial Advice',
          body: advice,
        },
        trigger: {
          hour: 12,
          minute: 0,
          repeats: true,
        },
      });

      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Evening Financial Advice',
          body: advice,
        },
        trigger: {
          hour: 18,
          minute: 0,
          repeats: true,
        },
      });


    } catch (error) {
      console.error('Error scheduling analytics notifications:', error);
      await this.sendLocalNotification(
        'Analytics Error',
        'Unable to fetch financial advice. Please check your connection.'
      );
    }
  }

  async sendLocalNotification(title: string, body: string) {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
        },
        trigger: null,
      });
    } catch (error) {
      console.error('Error sending local notification:', error);
    }
  }

  async cancelAllNotifications() {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
    } catch (error) {
      console.error('Error canceling notifications:', error);
    }
  }
}

export default NotificationService; 