function getAdactinCredentials() {
  const { ADACTIN_USERNAME, ADACTIN_PASSWORD } = process.env;

  if (!ADACTIN_USERNAME || !ADACTIN_PASSWORD) {
    throw new Error(
      'Set both ADACTIN_USERNAME and ADACTIN_PASSWORD environment variables before running authenticated tests.'
    );
  }

  return {
    username: ADACTIN_USERNAME,
    password: ADACTIN_PASSWORD
  };
}

module.exports = { getAdactinCredentials };
