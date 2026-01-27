#!/usr/bin/env bash
set -euo pipefail

echo "[1/7] Update OS"
sudo apt-get update
sudo apt-get upgrade -y

echo "[2/7] Install base packages"
sudo apt-get install -y \
  git \
  curl \
  wget \
  ca-certificates \
  gnupg \
  unzip \
  default-jdk

echo "[3/7] Install nvm + Node 22.22.0"
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
export NVM_DIR="$HOME/.nvm"
# shellcheck disable=SC1090
source "$NVM_DIR/nvm.sh"
nvm install 22.22.0
nvm alias default 22.22.0

echo "[4/7] Install VS Code"
wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > microsoft.gpg
sudo install -o root -g root -m 644 microsoft.gpg /etc/apt/trusted.gpg.d/
sudo sh -c 'echo "deb [arch=amd64] https://packages.microsoft.com/repos/code stable main" > /etc/apt/sources.list.d/vscode.list'
sudo apt-get update
sudo apt-get install -y code

echo "[5/7] Install Spring Tool Suite (STS)"
STS_VERSION="4.21.1.RELEASE"
STS_URL="https://download.springsource.com/release/STS4/${STS_VERSION}/dist/e4.30/spring-tool-suite-${STS_VERSION}-e4.30.0-linux.gtk.x86_64.tar.gz"

cd /opt
sudo wget -q "$STS_URL" -O sts.tar.gz
sudo tar -xzf sts.tar.gz
sudo rm sts.tar.gz
sudo ln -sf /opt/sts-4*/SpringToolSuite4 /usr/local/bin/sts

echo "[6/7] Install Spring Initializr CLI"
curl -s "https://get.sdkman.io" | bash
# shellcheck disable=SC1090
source "$HOME/.sdkman/bin/sdkman-init.sh"
sdk install springboot

echo "[7/7] Validate versions"
git --version
java -version
node -v
npm -v
code --version
sts --version || true
spring --version

echo "[8/7] Clean caches before imaging"
sudo apt-get clean
rm -rf ~/.cache/* || true
rm -rf ~/.npm/* || true
rm -rf ~/.sdkman/archives/* || true

echo "[DONE] Reboot recommended before creating the Image."
echo "Run: sudo reboot"
