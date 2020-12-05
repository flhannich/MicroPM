export function _getTask(token, id, setTask, setLoading) {
  if(!token) return;
  fetch(`http://192.168.178.35:8000/api/tasks/${id}`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'authorization': token,
    }
  })
  .then((response) => response.json())
  .then((json) => setTask(json))
  .catch((error) => console.error(error))
  .finally(() => setLoading(false))
}
