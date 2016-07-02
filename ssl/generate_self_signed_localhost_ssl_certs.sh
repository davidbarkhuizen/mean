# generate a self-signed SSL cert for localhost

# generate in .PEM format
# passphrase = thequickbrownfox 
#
echo 'passphrase = thequickbrownfox' 
openssl req -x509 -newkey rsa:2048 -keyout localhost_rsa_2048.key.pem -out localhost_rsa_2048.cert.pem -days 30 -subj '/CN=localhost/O=Black Pearl/OU=iSec'

# convert to .PFX format
# passphrase: JumpedOverTheLazyDog
#
echo 'first re-enter passphrase'
echo 'then use same passphrase as the export password: thequickbrownfox' 
openssl pkcs12 -inkey localhost_rsa_2048.key.pem -in localhost_rsa_2048.cert.pem -export -out localhost_rsa_2048.pfx

# https://www.sslshopper.com/ssl-converter.html
#
# The PKCS#12 or PFX format is a binary format for storing the server certificate, any 
# intermediate certificates, and the private key in one encryptable file. PFX files usually 
# have extensions such as .pfx and .p12. PFX files are typically used on Windows machines to 
# import and export certificates and private keys.

mv *.pem ../config/env/$1/
mv *.pfx ../config/env/$1/