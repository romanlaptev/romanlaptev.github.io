unit Unit1;

interface

uses
  Windows, Messages, SysUtils, Variants, Classes, Graphics, Controls, Forms,
  Dialogs, StdCtrls, ExtCtrls;

type
  TForm1 = class(TForm)
    Panel1: TPanel;
    ListBox1: TListBox;
    Panel3: TPanel;
    Panel2: TPanel;
    Image1: TImage;
    procedure FormCreate(Sender: TObject);
    procedure ListBox1Click(Sender: TObject);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

var
  Form1: TForm1;

procedure ClearImg;
procedure Sinus;
procedure Cosinus;
procedure Circle;
procedure Epic1;
procedure Epic2;
procedure Epic3;
procedure Hypocycloida_1;
procedure Hypocycloida_2;
procedure Hypocycloida_3;
procedure Astroida;
procedure Spiral;
procedure graph1;
procedure graph2;

implementation

{$R *.dfm}

procedure TForm1.FormCreate(Sender: TObject);
begin
  ListBox1.Items.Add('Синусоида');
  ListBox1.Items.Add('Косинусоида');
  ListBox1.Items.Add('Окружность');
  ListBox1.Items.Add('Эпициклоида 1');
  ListBox1.Items.Add('Эпициклоида 2');
  ListBox1.Items.Add('Эпициклоида 3');
  ListBox1.Items.Add('Гипоциклоида 1');
  ListBox1.Items.Add('Гипоциклоида 2');
  ListBox1.Items.Add('Гипоциклоида 3');
  ListBox1.Items.Add('Астроида');
  ListBox1.Items.Add('Спираль');
  ListBox1.Items.Add('График 1');
  ListBox1.Items.Add('График 2');
end;



procedure TForm1.ListBox1Click(Sender: TObject);
var
  name_func:string;
begin

//  ShowMessage (ListBox1.Items.Strings[ListBox1.ItemIndex]);
  name_func := ListBox1.Items.Strings[ListBox1.ItemIndex];

  if name_func = 'Синусоида' then
    begin
      Sinus;
    end;

  if name_func = 'Косинусоида' then
    begin
      Cosinus;
    end;

  if name_func = 'Окружность' then
    begin
      Circle;
    end;

  if name_func = 'Эпициклоида 1' then
    begin
      Epic1;
    end;

  if name_func = 'Эпициклоида 2' then
    begin
      Epic2;
    end;

  if name_func = 'Эпициклоида 3' then
    begin
      Epic3;
    end;

  if name_func = 'Гипоциклоида 1' then
    begin
      Hypocycloida_1;
    end;

  if name_func = 'Гипоциклоида 2' then
    begin
      Hypocycloida_2;
    end;

  if name_func = 'Гипоциклоида 3' then
    begin
      Hypocycloida_3;
    end;

  if name_func = 'Астроида' then
    begin
      Astroida;
    end;

  if name_func = 'Спираль' then
    begin
      Spiral;
    end;

  if name_func = 'График 1' then
    begin
      graph1;
    end;

  if name_func = 'График 2' then
    begin
      graph2;
    end;


end;

procedure ClearImg;
begin
  Form1.Image1.Canvas.Brush.Color := clWhite;
  Form1.Image1.Canvas.FillRect(Form1.ClientRect);
end;

procedure Sinus;
var
  x,y: real;
  x0,y0: integer;
  xx,yy: integer;
begin

  ClearImg;

  x0:= Form1.Image1.Width div 2;
  y0:= Form1.Image1.Height div 2;

  // оси

  Form1.Image1.Canvas.MoveTo(x0,y0);
  Form1.Image1.Canvas.LineTo(x0+150,y0);
  Form1.Image1.Canvas.LineTo(x0-150,y0);
  Form1.Image1.Canvas.MoveTo(x0,y0);
  Form1.Image1.Canvas.LineTo(x0,y0+100);
  Form1.Image1.Canvas.LineTo(x0,y0-100);

  x:=-3.14;
  y:=0;

  while x < 3.14 do
     begin
       y:=sin(x);
       xx:=x0+Round(x*60);
       yy:=y0-Round(y*60);
       Form1.Image1.Canvas.Pixels[xx,yy]:=clRed;
       x:=x+0.01;
     end;

end;

procedure Cosinus;
var
  x,y: real;
  x0,y0: integer;
  xx,yy: integer;
begin

  ClearImg;

  x0:= Form1.Image1.Width div 2;
  y0:= Form1.Image1.Height div 2;

  // оси

  Form1.Image1.Canvas.MoveTo(x0,y0);
  Form1.Image1.Canvas.LineTo(x0+150,y0);
  Form1.Image1.Canvas.LineTo(x0-150,y0);
  Form1.Image1.Canvas.MoveTo(x0,y0);
  Form1.Image1.Canvas.LineTo(x0,y0+100);
  Form1.Image1.Canvas.LineTo(x0,y0-100);

  x:=-3.14;
  y:=0;

  while x < 3.14 do
     begin
       y:=cos(x);
       xx:=x0+Round(x*60);
       yy:=y0-Round(y*60);
       Form1.Image1.Canvas.Pixels[xx,yy]:=clRed;
       x:=x+0.01;
     end;

end;


procedure Circle;
var
  n1: real;
  x,y: real;
  x0,y0: integer;
  xx,yy: integer;
  r1,r2,r3,r4: integer;
begin

  ClearImg;

  x0:= Form1.Image1.Width div 2;
  y0:= Form1.Image1.Height div 2;

  // оси

  with Form1.Image1 do
    begin
      Canvas.MoveTo(x0,y0);
      Canvas.LineTo(x0+150,y0);
      Canvas.LineTo(x0-150,y0);
      Canvas.MoveTo(x0,y0);
      Canvas.LineTo(x0,y0+100);
      Canvas.LineTo(x0,y0-100);
    end;

  x:=0;
  y:=0;
  r1:=50;
  r2:=50;

  while n1 < 36 do
     begin
       x:=r1*cos(n1);
       y:=r2*sin(n1);
       xx:=x0+Round(x);
       yy:=y0-Round(y);
       Form1.Image1.Canvas.Pixels[xx,yy]:=clRed;
       n1:=n1+0.01;
     end;

end;

procedure Epic1;
var
  n1: real;
  x,y: real;
  a1,a2: real;
  x0,y0: integer;
  xx,yy: integer;
  r1,r2,r3,r4: integer;
begin


  ClearImg;

  x0:= Form1.Image1.Width div 2;
  y0:= Form1.Image1.Height div 2;

  // оси

  with Form1.Image1 do
    begin
      Canvas.MoveTo(x0,y0);
      Canvas.LineTo(x0+150,y0);
      Canvas.LineTo(x0-150,y0);
      Canvas.MoveTo(x0,y0);
      Canvas.LineTo(x0,y0+100);
      Canvas.LineTo(x0,y0-100);
    end;


  x:=0;
  y:=0;

  r1:=60;
  r2:=50;

  while n1 < 36 do
     begin
       x:=(r1+r2) * cos(n1) - r2 * cos(((r1*r2)/r2)*n1);
       y:=(r1+r2) * sin(n1) - r2 * sin(((r1*r2)/r2)*n1);
       xx:=x0+Round(x);
       yy:=y0-Round(y);
       Form1.Image1.Canvas.Pixels[xx,yy]:=clRed;
       n1:=n1+0.001;
     end;

end;

procedure Epic2;
var
  n1: real;
  x,y: real;

  x0,y0: integer;
  xx,yy: integer;

  r1,r2: real;
  d,f,step : real;
  len : integer;

begin


  ClearImg;

  x0:= Form1.Image1.Width div 2;
  y0:= Form1.Image1.Height div 2;

  // оси

  with Form1.Image1 do
    begin
      Canvas.MoveTo(x0,y0);
      Canvas.LineTo(x0+150,y0);
      Canvas.LineTo(x0-150,y0);
      Canvas.MoveTo(x0,y0);
      Canvas.LineTo(x0,y0+100);
      Canvas.LineTo(x0,y0-100);
    end;


  x:=0;
  y:=0;

  r1:=70; // Радиус неподвижного круга
  r2:=30;  // Радиус скользящего круга
  d := 30; // Расстояние от центра неподвижного круга до точки
  step := 0.001; // Шаг изменения угла
  len  := 21840; // Кол-во повторений цикла


  while n1 < len do
     begin
       f := f + step;
       x:= Round ( (r1 + r2) * cos(f) - d * cos ((r1 + r2) / r2 * f) );
       y:= Round ( (r1 + r2) * sin(f) - d * sin ((r1 + r2) / r2 * f) );
       xx:=x0+Round(x);
       yy:=y0-Round(y);
       Form1.Image1.Canvas.Pixels[xx,yy]:=clRed;
       n1:=n1+1;
     end;

end;


procedure Epic3;
var
  n1: real;
  x,y: real;

  x0,y0: integer;
  xx,yy: integer;

  r1,r2: real;
  d,f,step : real;
  len : integer;

begin


  ClearImg;

  x0:= Form1.Image1.Width div 2;
  y0:= Form1.Image1.Height div 2;

  // оси

  with Form1.Image1 do
    begin
      Canvas.MoveTo(x0,y0);
      Canvas.LineTo(x0+150,y0);
      Canvas.LineTo(x0-150,y0);
      Canvas.MoveTo(x0,y0);
      Canvas.LineTo(x0,y0+100);
      Canvas.LineTo(x0,y0-100);
    end;


  x:=0;
  y:=0;

  r1:=50; // Радиус неподвижного круга
  r2:=10;  // Радиус скользящего круга
  d := 40; // Расстояние от центра неподвижного круга до точки
  step := 0.001; // Шаг изменения угла
  len  := 6700; // Кол-во повторений цикла


  while n1 < len do
     begin
       f := f + step;
       x:= Round ( (r1 + r2) * cos(f) - d * cos ((r1 + r2) / r2 * f) );
       y:= Round ( (r1 + r2) * sin(f) - d * sin ((r1 + r2) / r2 * f) );
       xx:=x0+Round(x);
       yy:=y0-Round(y);
       Form1.Image1.Canvas.Pixels[xx,yy]:=clRed;
       n1:=n1+1;
     end;

end;


procedure Hypocycloida_1;
var
  n1: real;
  x,y: real;
  a1,a2: real;
  x0,y0: integer;
  xx,yy: integer;
  r1,r2,r3,r4: integer;
begin


  ClearImg;

  x0:= Form1.Image1.Width div 2;
  y0:= Form1.Image1.Height div 2;

  // оси

  with Form1.Image1 do
    begin
      Canvas.MoveTo(x0,y0);
      Canvas.LineTo(x0+150,y0);
      Canvas.LineTo(x0-150,y0);
      Canvas.MoveTo(x0,y0);
      Canvas.LineTo(x0,y0+100);
      Canvas.LineTo(x0,y0-100);
    end;


  x:=0;
  y:=0;

  r1:=60;
  r2:=50;

  while n1 < 36 do
     begin
       x:=r2 * (2 * cos(n1) + cos(2*n1));
       y:=r2 * (2 * sin(n1) + sin(2*n1));
       xx:=x0+Round(x);
       yy:=y0-Round(y);
       Form1.Image1.Canvas.Pixels[xx,yy]:=clRed;
       n1:=n1+0.001;
     end;

end;

procedure Hypocycloida_2;
var
  n1: real;
  x,y: real;
  a1,a2: real;
  x0,y0: integer;
  xx,yy: integer;
  r1,r2,r3,r4: integer;
begin


  ClearImg;

  x0:= Form1.Image1.Width div 2;
  y0:= Form1.Image1.Height div 2;

  // оси

  with Form1.Image1 do
    begin
      Canvas.MoveTo(x0,y0);
      Canvas.LineTo(x0+150,y0);
      Canvas.LineTo(x0-150,y0);
      Canvas.MoveTo(x0,y0);
      Canvas.LineTo(x0,y0+100);
      Canvas.LineTo(x0,y0-100);
    end;


  x:=0;
  y:=0;

  a1:=0.5;
  a2:=2;

  r1:=50;
  r2:=50;
  r3:=25;
  r4:=25;

  while n1 < 36 do
     begin
       x:=r1 * cos(a1 * n1) - r3 * cos(a2 * n1);
       y:=r1 * sin(a1 * n1) - r3 * sin(a2 * n1);
       xx:=x0+Round(x);
       yy:=y0-Round(y);
       Form1.Image1.Canvas.Pixels[xx,yy]:=clRed;
       n1:=n1+0.001;
     end;

end;


procedure Hypocycloida_3;
var
  n1: real;
  x,y: real;
  z: real;
  x0,y0: integer;
  xx,yy: integer;
begin


  ClearImg;

  x0:= Form1.Image1.Width div 2;
  y0:= Form1.Image1.Height div 2;

  // оси

  with Form1.Image1 do
    begin
      Canvas.MoveTo(x0,y0);
      Canvas.LineTo(x0+150,y0);
      Canvas.LineTo(x0-150,y0);
      Canvas.MoveTo(x0,y0);
      Canvas.LineTo(x0,y0+100);
      Canvas.LineTo(x0,y0-100);
    end;


  x:=0;
  y:=0;


  while n1 < 360 do
     begin
       z:=6.2832 * n1 / 360;
       x:=100 * sin (5 * z) * cos (26 * z);
       y:=100 * cos (5 * z) * sin (26 * z);
       xx:=x0+Round(x);
       yy:=y0-Round(y);
       Form1.Image1.Canvas.Pixels[xx,yy]:=clRed;
       n1:=n1+0.01;
     end;

end;

procedure Astroida;
var
  n1: real;
  x,y: real;
  a1,a2: real;
  x0,y0: integer;
  xx,yy: integer;
  r1,r2,r3,r4: integer;
begin


  ClearImg;

  x0:= Form1.Image1.Width div 2;
  y0:= Form1.Image1.Height div 2;

  // оси

  with Form1.Image1 do
    begin
      Canvas.MoveTo(x0,y0);
      Canvas.LineTo(x0+150,y0);
      Canvas.LineTo(x0-150,y0);
      Canvas.MoveTo(x0,y0);
      Canvas.LineTo(x0,y0+100);
      Canvas.LineTo(x0,y0-100);
    end;


  x:=0;
  y:=0;

  r1:=80;
  r2:=20;

  while n1 < 36 do
     begin
       x:=r1 * cos(n1) * cos(n1) * cos(n1);
       y:=r1 * sin(n1) * sin(n1) * sin(n1);
       xx:=x0+Round(x);
       yy:=y0-Round(y);
       Form1.Image1.Canvas.Pixels[xx,yy]:=clRed;
       n1:=n1+0.001;
     end;

end;

procedure Spiral;
var
  n1: real;
  x,y: real;
  a1,a2: real;
  x0,y0: integer;
  xx,yy: integer;
  r1,r2,r3,r4: integer;
begin


  ClearImg;

  x0:= Form1.Image1.Width div 2;
  y0:= Form1.Image1.Height div 2;

  // оси

  with Form1.Image1 do
    begin
      Canvas.MoveTo(x0,y0);
      Canvas.LineTo(x0+150,y0);
      Canvas.LineTo(x0-150,y0);
      Canvas.MoveTo(x0,y0);
      Canvas.LineTo(x0,y0+100);
      Canvas.LineTo(x0,y0-100);
    end;


  x:=0;
  y:=0;

  r1:=15;
  r2:=5;

  while n1 < 36 do
     begin
       x:=r1 * cos(n1) + r2 * n1 * sin(n1);
       y:=r1 * sin(n1) - r2 * n1 * cos(n1);
       xx:=x0+Round(x);
       yy:=y0-Round(y);
       Form1.Image1.Canvas.Pixels[xx,yy]:=clRed;
       n1:=n1+0.001;
     end;

end;

procedure graph1;
var
  n1: real;
  x,y: real;
  x0,y0: integer;
  xx,yy: integer;
  x1,y1: integer;
  x2,y2: integer;
begin


  ClearImg;

  x0:= Form1.Image1.Width div 2;
  y0:= Form1.Image1.Height div 2;

  // оси

  with Form1.Image1 do
    begin
      Canvas.MoveTo(x0,y0);
      Canvas.LineTo(x0+150,y0);
      Canvas.LineTo(x0-150,y0);
      Canvas.MoveTo(x0,y0);
      Canvas.LineTo(x0,y0+100);
      Canvas.LineTo(x0,y0-100);
    end;

  Form1.Image1.Canvas.Pen.Color := clBlue;

  n1:=0;
  while n1 < 95 do
     begin

       x1:= Round(x0 + n1 * cos(n1/10));
       y1:= Round(y0 - n1);

       x2:= Round(x0 - n1 * cos(n1/10));
       y2:= Round(y0 + n1);

       Form1.Image1.Canvas.MoveTo (x1,y1);
       Form1.Image1.Canvas.LineTo (x2,y2);

       n1:=n1+1;
     end;

end;

procedure graph2;
var
  n1: real;
  x,y: real;
  x0,y0: integer;
  xx,yy: integer;
  x1,y1: integer;
  x2,y2: integer;
begin


  ClearImg;

  x0:= Form1.Image1.Width div 2;
  y0:= Form1.Image1.Height div 2;

  // оси

  with Form1.Image1 do
    begin
      Canvas.MoveTo(x0,y0);
      Canvas.LineTo(x0+150,y0);
      Canvas.LineTo(x0-150,y0);
      Canvas.MoveTo(x0,y0);
      Canvas.LineTo(x0,y0+100);
      Canvas.LineTo(x0,y0-100);
    end;

  Form1.Image1.Canvas.Pen.Color := clBlue;

  n1:=0;

  while n1 < 95 do
     begin

       x1:= Round((x0+90) + n1 * cos(n1/10));
       y1:= Round(y0 - n1);

       x2:= Round((x0-90) - n1 * cos(n1/10));
       y2:= Round(y0 + n1);

//       x1:= Round(x0 + n1 * cos(n1/10));
//       x2:= Round(x0 - n1 * cos(n1/10));

//       y1:= Round(y0 - n1);
//       y2:= Round(y0 + n1);

       Form1.Image1.Canvas.MoveTo (x1,y1);
       Form1.Image1.Canvas.LineTo (x2,y2);

       n1:=n1+1;
     end;

  n1:=0;
  Form1.Image1.Canvas.Pen.Color := clRed;
  while n1 < 95 do
     begin

       x1:= Round(x0 + n1);
       y1:= Round((y0+50) + n1 * cos(n1/10));

       x2:= Round(x0 - n1);
       y2:= Round((y0-50) - n1 * cos(n1/10));

       Form1.Image1.Canvas.MoveTo (x1,y1);
       Form1.Image1.Canvas.LineTo (x2,y2);

       n1:=n1+1;
     end;

  n1:=0;
  Form1.Image1.Canvas.Pen.Color := clGreen;
  while n1 < 95 do
     begin

       x1:= Round(x0 - n1);
       y1:= Round((y0+40) + n1 * cos(n1/10));

       x2:= Round(x0 + n1);
       y2:= Round((y0-40) - n1 * cos(n1/10));

       Form1.Image1.Canvas.MoveTo (x1,y1);
       Form1.Image1.Canvas.LineTo (x2,y2);

       n1:=n1+1;
     end;

  n1:=0;
  Form1.Image1.Canvas.Pen.Color := clSilver;
  while n1 < 95 do
     begin

       x1:= Round((x0+100) + n1 * cos(n1/10));
       y1:= Round(y0 + n1);

       x2:= Round((x0-80) - n1 * cos(n1/10));
       y2:= Round(y0 - n1);

       Form1.Image1.Canvas.MoveTo (x1,y1);
       Form1.Image1.Canvas.LineTo (x2,y2);

       n1:=n1+1;
     end;


end;

end.
