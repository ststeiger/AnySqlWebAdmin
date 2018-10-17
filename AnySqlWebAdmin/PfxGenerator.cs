// System.Security.Cryptography.X509Certificates.X509Certificate2.Import (string fileName);

// https://docs.microsoft.com/en-us/dotnet/api/system.security.cryptography.x509certificates.x509certificate2.import?view=netframework-4.7.2
// https://gist.github.com/yutopio/a217a4af63cf6bcf0a530c14c074cf8f
// https://gist.githubusercontent.com/yutopio/a217a4af63cf6bcf0a530c14c074cf8f/raw/42b2f8cb27f6d22b7e22d65da5bbd0f1ce9b2fff/cert.cs
// https://stackoverflow.com/questions/44755155/store-pkcs12-container-pfx-with-bouncycastle
private void CreatePfxFile(X509Certificate certificate, AsymmetricKeyParameter privateKey)
{
    // create certificate entry
    var certEntry = new X509CertificateEntry(certificate);
    string friendlyName = certificate.SubjectDN.ToString();

    // get bytes of private key.
    PrivateKeyInfo keyInfo = PrivateKeyInfoFactory.CreatePrivateKeyInfo(privateKey);
    byte[] keyBytes = keyInfo.ToAsn1Object().GetEncoded();

    var builder = new Pkcs12StoreBuilder();
    builder.SetUseDerEncoding(true);
    var store = builder.Build();

    // create store entry
    store.SetKeyEntry(Core.Constants.PrivateKeyAlias, new AsymmetricKeyEntry(privateKey), new X509CertificateEntry[] { certEntry });

    byte[] pfxBytes = null;

    var password = Guid.NewGuid().ToString("N");

    using (MemoryStream stream = new MemoryStream())
    {
        store.Save(stream, password.ToCharArray(), new SecureRandom());
        pfxBytes = stream.ToArray();
    }

    var result = Pkcs12Utilities.ConvertToDefiniteLength(pfxBytes);
    this.StoreCertificate(Convert.ToBase64String(result));
}
