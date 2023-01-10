import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import React, { useRef, useState, useEffect } from 'react';
import IsLoggedInOrRedirect from '../../../../../components/isLoggedIn'
import TwoColumnsLayout from '../../../../../components/TwoColumnsLayout'
import NavigationMenu from '../../../../../components/NavigationMenu'
import { get_workspaces_list} from '../../../../../api_calls'
import withNoSSR from './WithNoSSR'
import grapesjs from 'grapesjs'
import 'grapesjs/dist/css/grapes.min.css'
import 'grapesjs/dist/grapes.min.js'
import 'grapesjs-preset-newsletter/dist/grapesjs-preset-newsletter.css'
import 'grapesjs-preset-newsletter/dist/grapesjs-preset-newsletter.min.js'


function EditorPage({ workspaces, current_wks }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    grapesjs.init({
      container: '#gjs',
      height: '700px',
      width: '100%',
      storageManager: {
        id: 'gjs-',
        type: 'local',
        autosave: true,
        storeComponents: true,
        storeStyles: true,
        storeHtml: true,
        storeCss: true,
      },
      layerManager: {
        appendTo: '.layers-container'
      },
      panels: {
        defaults: [{
          id: 'layers',
          el: '.panel__right',
          // Make the panel resizable
          resizable: {
            maxDim: 350,
            minDim: 200,
            tc: 0, // Top handler
            cl: 1, // Left handler
            cr: 0, // Right handler
            bc: 0, // Bottom handler
            // Being a flex child we need to change `flex-basis` property
            // instead of the `width` (default)
            keyWidth: 'flex-basis',
          },
        }]
      },
      deviceManager: {
        devices:
        [
          {
            id: 'desktop',
            name: 'Desktop',
            width: '',
          },
          {
            id: 'tablet',
            name: 'Tablet',
            width: '768px',
            widthMedia: '992px',
          },
          {
            id: 'mobilePortrait',
            name: 'Mobile portrait',
            width: '320px',
            widthMedia: '575px',
          },
        ]
      }
    })
  },[])

  return (
    <IsLoggedInOrRedirect>
    <div>
    <TwoColumnsLayout>
      <NavigationMenu workspaces={workspaces} current_wks={current_wks}/>

      <div class="panel__top">
          <div class="panel__basic-actions"></div>
      </div>
      <div class="editor-row">
        <div class="editor-canvas">
          <div id="gjs">...</div>
        </div>
        <div class="panel__right">
          <div class="layers-container"></div>
        </div>
      </div>
    </TwoColumnsLayout>

    

    <footer>
      <a
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by Virgin
      </a>
    </footer>
  </div>
  </IsLoggedInOrRedirect> 
)
}

export async function getServerSideProps(context) {

    // Fetch data from API
    let { workspaces, current_wks } = await get_workspaces_list(context)
  
    // Pass data to the page via props
    return { props: { workspaces, current_wks } }
  }

  export default withNoSSR(EditorPage)