
export const badgeCounter = {
  borderRadius: 11,
  borderWidth: 1,
  flexDirection: 'row',
  alignSelf: 'flex-start',
  minWidth: 23,
  paddingHorizontal: 5,
  paddingVertical: 3,
  overflow: 'hidden',
  textAlign: 'center',
}

export const badgeCounterReview = {
  borderColor: '#007AFF',
  ...badgeCounter,
};
export const badgeCounterTask = {
  backgroundColor: '#E4EDFE',
  borderColor: '#E4EDFE',
  ...badgeCounter,
};

export const badge = {
  borderRadius: 11,
  borderWidth: 1,
  flexDirection: 'row',
  alignSelf: 'flex-start',
  paddingHorizontal: 12,
  paddingVertical: 3,
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
  overflow: 'hidden',
  textAlign: 'center',
  alignSelf: 'center',
  width: '100%',
};

export const secondary = {
  borderRadius: 4,
  paddingHorizontal: 24,
  paddingVertical: 12,
  overflow: 'hidden',
  // borderWidth: 1,
  // borderColor: '#007AFF',
  textAlign: 'center',
};
