const response = await fetch('https://apitestchat.hasaki.vn/api/v1/user/getPendingMentionOfEmployeeV2', {
  method: 'GET',
  headers: {
    'accept': 'application/json, text/plain, */*',
    'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXJ0bmVyX2lkIjoxLCJwYXJ0bmVyX3VzZXJfaWQiOiI2IiwibWFqb3JfaWQiOjE0MiwibmFtZSI6IsSQaW5oIEjDsmEgSGnhu4dwIiwiaWF0IjoxNzQzNzUxMzg4fQ.XzUzIqsrUY4pW9sV34yPGOeFyspT2NEWByJ0qKXDIpI',
  },
});

if (response.ok) {
  const contentType = response.headers.get('Content-Type');
  if (contentType && contentType.includes('application/json')) {
    const result = await response.json();
    console.log(result);
  } else {
    console.error('Expected JSON, but got:', contentType);
  }
} else {
  console.error('Error fetching data:', response.status);
}
