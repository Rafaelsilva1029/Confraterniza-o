/**
 * Voice Transcription - DESATIVADO
 * 
 * Este módulo foi desativado pois o aplicativo não possui autenticação
 * e não requer integração com transcrição de voz.
 */

export type TranscribeOptions = {
  audioUrl: string;
  language?: string;
  prompt?: string;
};

export type WhisperSegment = {
  id: number;
  seek: number;
  start: number;
  end: number;
  text: string;
  tokens: number[];
  temperature: number;
  avg_logprob: number;
  compression_ratio: number;
  no_speech_prob: number;
};

export type TranscribeResponse = {
  text: string;
  language: string;
  segments: WhisperSegment[];
};

export async function transcribe(options: TranscribeOptions): Promise<TranscribeResponse> {
  throw new Error("Voice transcription is disabled in this public application");
}
