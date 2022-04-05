import UserAPI from "app/api/modules/userAPI";
import { useUserInfo } from "app/utils/hooks";
import React, { useEffect, useState } from "react";

export default function OpenToWorkButton({ value }) {
  const user = useUserInfo();
  const [checked, setChecked] = useState(value);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const onClick = async () => {
      setLoading(true);
      const res = await UserAPI.updateProfile({
        profileStatus: checked ? 1 : 0,
      });

      if (res.status === 200) {
        setLoading(false);
      }
    };

    onClick();
  }, [checked]);

  return (
    <>
      {user.user.roleId === 1 && (
        <button className="flex gap-2">
          <input
            disabled={loading}
            type="checkbox"
            checked={checked}
            onChange={(val) => setChecked(val.target.checked)}
          />
          <p>Open to work</p>
        </button>
      )}
    </>
  );
}
