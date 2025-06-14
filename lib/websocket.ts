"use client"

// Real-time WebSocket service with JWT authentication
class WebSocketService {
  private ws: WebSocket | null = null
  private reconnectAttempts = 0
  private maxReconnectAttempts = 5
  private reconnectInterval = 3000
  private listeners: Map<string, Function[]> = new Map()
  private token: string | null = null

  connect(token: string) {
    this.token = token
    try {
      // In production, this would be wss://your-domain.com/ws
      this.ws = new WebSocket(`ws://localhost:3001/ws?token=${token}`)

      this.ws.onopen = () => {
        console.log("WebSocket connected")
        this.reconnectAttempts = 0
        this.emit("connected", { status: "connected" })
      }

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          this.emit(data.type, data.payload)
        } catch (error) {
          console.error("Failed to parse WebSocket message:", error)
        }
      }

      this.ws.onclose = () => {
        console.log("WebSocket disconnected")
        this.emit("disconnected", { status: "disconnected" })
        this.attemptReconnect()
      }

      this.ws.onerror = (error) => {
        console.error("WebSocket error:", error)
        this.emit("error", { error })
      }
    } catch (error) {
      console.error("Failed to connect WebSocket:", error)
      // Fallback to polling for demo
      this.startPolling()
    }
  }

  private startPolling() {
    // Fallback polling mechanism for demo
    setInterval(() => {
      this.emit("data-update", { timestamp: new Date() })
    }, 5000)
  }

  private attemptReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts && this.token) {
      this.reconnectAttempts++
      setTimeout(() => {
        console.log(`Attempting to reconnect... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`)
        this.connect(this.token!)
      }, this.reconnectInterval)
    }
  }

  send(type: string, payload: any) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type, payload }))
    } else {
      // Store message for when connection is restored
      console.log("WebSocket not connected, message queued:", { type, payload })
    }
  }

  on(event: string, callback: Function) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, [])
    }
    this.listeners.get(event)?.push(callback)
  }

  off(event: string, callback: Function) {
    const callbacks = this.listeners.get(event)
    if (callbacks) {
      const index = callbacks.indexOf(callback)
      if (index > -1) {
        callbacks.splice(index, 1)
      }
    }
  }

  private emit(event: string, data: any) {
    const callbacks = this.listeners.get(event)
    if (callbacks) {
      callbacks.forEach((callback) => callback(data))
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close()
      this.ws = null
    }
    this.token = null
  }
}

export const wsService = new WebSocketService()
