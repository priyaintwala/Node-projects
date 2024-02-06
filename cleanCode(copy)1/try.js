function repairBase64String(base64String) {
    // Step 1: Add padding characters if needed
    while (base64String.length % 4 !== 0) {
      base64String += '=';
    }
  
    // Step 2: Remove non-Base64 characters
    base64String = base64String.replace(/[^A-Za-z0-9+/=]/g, '');
  
    // Step 3: Decode the string
    const binaryString = atob(base64String);
  
    // Step 4: Re-encode the binary string
    const repairedBase64String = btoa(binaryString);
  
    return repairedBase64String;
}
 
 
repairBase64String(base64String)