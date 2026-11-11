import type { Category, Tool } from "@/lib/types";
export const categories: Category[] = [
  { id:"1", name:"AI Writing", slug:"ai-writing", description:"Writing, rewriting, and copywriting assistants.", icon:"pen-line" },
  { id:"2", name:"AI Image", slug:"ai-image", description:"Image generation, editing, and graphic design.", icon:"image" },
  { id:"3", name:"AI Video", slug:"ai-video", description:"Video generation, editing, and animation.", icon:"video" },
  { id:"4", name:"AI Audio & Voice", slug:"ai-audio-voice", description:"Voice generation, cloning, music, and audio tools.", icon:"audio-lines" },
  { id:"5", name:"AI Chatbots", slug:"ai-chatbots", description:"Chatbots, assistants, and AI agents.", icon:"bot" },
  { id:"6", name:"AI Coding", slug:"ai-coding", description:"Coding assistants and developer productivity.", icon:"code" },
  { id:"7", name:"AI Marketing & SEO", slug:"ai-marketing-seo", description:"Marketing, SEO, and content growth tools.", icon:"megaphone" },
  { id:"8", name:"AI Productivity", slug:"ai-productivity", description:"Automation, workflow, and business tools.", icon:"workflow" },
  { id:"9", name:"AI Website Builders", slug:"ai-website-builders", description:"Build websites and landing pages with AI.", icon:"globe" },
  { id:"10", name:"AI Education", slug:"ai-education", description:"Learning, teaching, and research assistants.", icon:"graduation-cap" },
  { id:"11", name:"AI Presentations", slug:"ai-presentations", description:"Create slides, documents, and presentations.", icon:"presentation" },
  { id:"12", name:"AI Data & Analytics", slug:"ai-data-analytics", description:"Data analysis, visualization, and insights.", icon:"chart-no-axes-combined" },
  { id:"13", name:"AI Avatars & Animation", slug:"ai-avatars-animation", description:"Talking avatars, doodles, and animation.", icon:"user-round" },
  { id:"14", name:"Other AI Tools", slug:"other-ai-tools", description:"Discover useful tools across other AI categories.", icon:"layers" }
];
// Demo records only. Replace affiliate_url with your approved tracking URL before publishing.
export const demoTools: Tool[] = [
  { id:"demo-artistly", name:"Artistly", slug:"artistly", tagline:"AI-powered image creation and design", description:"Explore an AI-assisted creative workflow for generating artwork and visual assets. Verify current features, usage limits, and commercial rights on the vendor website before purchasing.", logo_url:null, website_url:"https://artistly.ai/", affiliate_url:null, category_slug:"ai-image", tags:["image generation","design","creative"], pricing:"Check vendor", featured:true, status:"published" },
  { id:"demo-humanpal", name:"HumanPal", slug:"humanpal", tagline:"Create presenter-style avatar videos", description:"Explore AI avatar video workflows for explainers, presentations, and marketing content. Check supported languages, voice options, export limits, and licensing before choosing a plan.", logo_url:null, website_url:"https://humanpal.io/", affiliate_url:null, category_slug:"ai-avatars-animation", tags:["avatar","video","presenter"], pricing:"Check vendor", featured:true, status:"published" },
  { id:"demo-videoexpress", name:"VideoExpress.ai", slug:"videoexpress-ai", tagline:"AI-assisted video creation", description:"Explore a video creation workflow and evaluate the output quality, editing controls, usage limits, and commercial rights using the official product information.", logo_url:null, website_url:"https://videoexpress.ai/", affiliate_url:null, category_slug:"ai-video", tags:["video","creator","editing"], pricing:"Check vendor", featured:true, status:"published" },
  { id:"demo-clicksites", name:"ClickSites AI", slug:"clicksites-ai", tagline:"AI-assisted website creation", description:"Explore website-building workflows and compare templates, hosting, custom domains, SEO controls, and export options before purchasing.", logo_url:null, website_url:"https://clicksites.ai/", affiliate_url:null, category_slug:"ai-website-builders", tags:["website","landing page","no-code"], pricing:"Check vendor", featured:false, status:"published" },
  { id:"demo-clonevoice", name:"CloneVoice AI", slug:"clonevoice-ai", tagline:"AI voice and speech workflows", description:"Evaluate voice quality, language support, consent requirements, commercial usage terms, and privacy controls before using any voice cloning service.", logo_url:null, website_url:"https://clonevoice.ai/", affiliate_url:null, category_slug:"ai-audio-voice", tags:["voice","audio","speech"], pricing:"Check vendor", featured:false, status:"published" }
];
