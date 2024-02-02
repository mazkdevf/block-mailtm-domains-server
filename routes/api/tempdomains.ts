export default eventHandler(async () => {
  try {
    const data = await fetch('https://api.mail.tm/domains');
    console.log('data:', data);

    if (data.ok) {
      const responseData = await data.json();
      const domains = responseData['hydra:member'].map((item: { domain: string }) => item.domain);
      return {
        success: true,
        message: 'Successfully fetched domains',
        temporaryMailDomains: domains
      };
    } else {
      console.error('Failed to fetch domains:', data.status, data.statusText);
      return {
        success: false,
        error: true,
        message: 'Failed to fetch domains'
      };
    }
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return { error: error.message };
  }
});
