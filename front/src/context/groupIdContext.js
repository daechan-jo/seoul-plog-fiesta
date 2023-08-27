import React, { createContext, useState } from 'react';

export const GroupIdContext = createContext();

export function GroupIdProvider({ children }) {
  const [adminId, setAdminId] = useState(null);
  const [groupId, setGroupId] = useState(null);

  return (
    <GroupIdContext.Provider
      value={{ adminId, setAdminId, groupId, setGroupId }}
    >
      {children}
    </GroupIdContext.Provider>
  );
}
