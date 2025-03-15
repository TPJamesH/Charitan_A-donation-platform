# Backend setup

## 1. Clone the backend repo

```
git clone https://github.com/Dragon-Squad/teamB-backend
```

## 2. Deploy using Ngrok

### 2.1 Get Ngrok

- Choose your preferred platform and follow the instruction to install ngrok
<https://dashboard.ngrok.com/get-started/setup/>
- You can either choose to install Ngrok using a package manager or by downloading the binary file and,
- ***If you choose the 'Download' option, make sure to add ngrok to your system's PATH and restart your terminal***

### 2.2 Verify Ngrok installation

```
ngrok --version
```

## 3. Deployment

### 3.1 Return to backend repo

```
cd teamB-backend
```

### 3.2 Run the script

#### Linux/MacOS

```bash
sudo chmod +x ./setup.sh
./setup.sh
```

#### Windows

```
.\setup.bat
```

## 4. Access the APIs

### The APIs now can be accessed through the public URL provided: <https://famous-awfully-mammal.ngrok-free.app>
