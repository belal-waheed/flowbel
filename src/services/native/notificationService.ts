import { Capacitor } from '@capacitor/core';
import { LocalNotifications } from '@capacitor/local-notifications';

function hashStringToId(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % 2000000000;
}

export const notificationService = {
  async scheduleDailyReminder(
    hour: number = 20,
    minute: number = 0,
    title: string = 'Flowbel Daily Check-In',
    body: string = 'Take 30 seconds to log today\'s spending and protect your safe daily burn.'
  ): Promise<void> {
    try {
      if (!Capacitor.isNativePlatform()) return;

      const perm = await LocalNotifications.checkPermissions();
      if (perm.display !== 'granted') {
        const req = await LocalNotifications.requestPermissions();
        if (req.display !== 'granted') return;
      }

      await LocalNotifications.schedule({
        notifications: [
          {
            id: 1001,
            title,
            body,
            schedule: {
              on: {
                hour,
                minute
              },
              allowWhileIdle: true
            },
            smallIcon: 'ic_stat_icon_config_sample',
            iconColor: '#8C431D'
          }
        ]
      });
    } catch (err) {
      console.warn('Failed to schedule daily reminder notification:', err);
    }
  },

  async scheduleCoolingUnlockNotification(
    expenseId: string,
    title: string,
    body: string,
    unlockTimestamp: number
  ): Promise<void> {
    try {
      if (!Capacitor.isNativePlatform()) return;

      const unlockDate = new Date(unlockTimestamp);
      if (unlockDate.getTime() <= Date.now()) return;

      const perm = await LocalNotifications.checkPermissions();
      if (perm.display !== 'granted') {
        const req = await LocalNotifications.requestPermissions();
        if (req.display !== 'granted') return;
      }

      const notifId = hashStringToId(expenseId);
      await LocalNotifications.schedule({
        notifications: [
          {
            id: notifId,
            title,
            body,
            schedule: {
              at: unlockDate,
              allowWhileIdle: true
            },
            smallIcon: 'ic_stat_icon_config_sample',
            iconColor: '#8C431D',
            extra: { expenseId }
          }
        ]
      });
    } catch (err) {
      console.warn('Failed to schedule cooling unlock notification:', err);
    }
  },

  async cancelNotification(id: number): Promise<void> {
    try {
      if (!Capacitor.isNativePlatform()) return;
      await LocalNotifications.cancel({
        notifications: [{ id }]
      });
    } catch (err) {
      console.warn('Failed to cancel notification:', err);
    }
  }
};
