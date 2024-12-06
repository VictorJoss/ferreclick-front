import { Component, OnInit, Renderer2, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

@Component({
  selector: 'app-chat-bot',
  standalone: true,
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <df-messenger
      project-id="ferreclickbot"
      agent-id="b89d5dfb-4c0d-4055-9e4b-42acd51be580"
      language-code="en"
      max-query-length="-1">
      <df-messenger-chat-bubble chat-title="f-bot"></df-messenger-chat-bubble>
    </df-messenger>
  `,
  styles: [`
    df-messenger {
      z-index: 999;
      position: fixed;
      --df-messenger-font-color: #000;
      --df-messenger-font-family: Google Sans;
      --df-messenger-chat-background: #f3f6fc;
      --df-messenger-message-user-background: #d3e3fd;
      --df-messenger-message-bot-background: #fff;
      bottom: 16px;
      right: 16px;
    }
  `]
})
export class ChatBotComponent implements OnInit{

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    // Agregar CSS externo
    const link = this.renderer.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/themes/df-messenger-default.css';
    this.renderer.appendChild(document.head, link);

    // Agregar JS externo
    const script = this.renderer.createElement('script');
    script.src = 'https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/df-messenger.js';
    this.renderer.appendChild(document.body, script);
  }
}
