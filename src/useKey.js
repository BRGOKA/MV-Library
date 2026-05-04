import { useEffect } from "react";

export function useKey(Key, action) {
  useEffect(
    function () {
      function callback(e) {
        if (e.key.toLowerCase() === Key.toLowerCase()) {
          action();
        }
      }

      document.addEventListener("keydown", callback);

      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [action, Key],
  );
}
