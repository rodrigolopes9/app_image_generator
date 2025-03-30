import * as dotenv from 'dotenv'
dotenv.config();

import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

import fs from "node:fs";
import axios from "axios";
import FormData from "form-data";

let apiKey = process.env.STABILITYAPIKEY

app.post('/dream', async(req,res)=> {
    const receivedPrompt = req.body.prompt;

    const payload = {
        prompt: receivedPrompt,
        output_format: "png"
    };

    const response = await axios.postForm(
        `https://api.stability.ai/v2beta/stable-image/generate/sd3`,
        axios.toFormData(payload, new FormData()),
        {
          validateStatus: undefined,
          responseType: "arraybuffer",
          headers: { 
            Authorization: `Bearer ${apiKey}`, 
            Accept: "image/*" 
          },
        },
      );

    if(response.status === 200) {
        console.log("sucessfull")
        res.send(Buffer.from(response.data));
      } else {
        throw new Error(`${response.status}: ${response.data.toString()}`);
      }
});

app.listen('8080', () => console.log("Ready: make art on http://localhost:8080/dream"))