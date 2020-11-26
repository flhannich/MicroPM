
export const badgeCounter = {
  borderRadius: 12,
  borderWidth: 1,
  flexDirection: 'row',
  alignSelf: 'flex-start',
  minWidth: 24,
  height: 24,
  lineHeight: 23,
  paddingHorizontal: 5,
  overflow: 'hidden',
  textAlign: 'center',
}

export const badgeCounterReview = {
  borderColor: '#007AFF',
  ...badgeCounter,
};

export const badgeCounterHeader = {
  borderColor: '#007AFF',
  backgroundColor: '#007AFF',
  borderRadius: 9,
  borderWidth: 1,
  flexDirection: 'row',
  alignSelf: 'flex-start',
  minWidth: 17,
  paddingVertical: 0,
  overflow: 'hidden',
  textAlign: 'center',
};

export const badgeCounterTask = {
  backgroundColor: '#E4EDFE',
  borderColor: '#E4EDFE',
  ...badgeCounter,
};

export const badge = {
  borderRadius: 14,
  height: 24,
  lineHeight: 23,
  borderWidth: 1,
  flexDirection: 'row',
  alignSelf: 'flex-start',
  paddingHorizontal: 14,
  overflow: 'hidden',
  textAlign: 'center',
}

export const badgeReview = {
  borderColor: '#007AFF',
  ...badge,
};
export const badgeCompleted = {
  backgroundColor: '#E4EDFE',
  borderColor: '#E4EDFE',
  ...badge,
};
export const badgeNotStarted = {
  backgroundColor: '#eee',
  borderColor: '#eee',
  ...badge,
};
export const badgeInProgress = {
  backgroundColor: '#E4EDFE',
  borderColor: '#E4EDFE',
  ...badge,
};

export const primary = {
  backgroundColor: '#007AFF',
  borderRadius: 4,
  paddingHorizontal: 24,
  paddingVertical: 12,
  alignItems: 'center',
};

export const secondary = {
  borderRadius: 4,
  paddingHorizontal: 24,
  paddingVertical: 8,
  overflow: 'hidden',
  // borderWidth: 1,
  // borderColor: '#007AFF',
  textAlign: 'center',
};
