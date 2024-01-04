name: devremit.isendglobal.com

on:
  create:
    tags:
      - '*'

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Get tag
        id: get_tag
        run: echo "TAG=${GITHUB_REF#refs/tags/}" >> $GITHUB_ENV

      - name: Build app
        run: |
          REACT_APP_NAME="iSend Admin"
          REACT_APP_API_BASE_URL=https://devadminapi.isendglobal.com/api
          REACT_APP_VERSION=$TAG
          npm run build

      - name: Upload to S3
        uses: jakejarvis/s3-sync-action@master
        env:
          SOURCE_DIR: dist/
          AWS_S3_BUCKET: ${{ secrets.AWS_S3_BUCKET }}
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
