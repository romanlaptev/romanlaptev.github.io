<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">
<html>
<title> test xml </title>
<head>
<script>
//alert ("Hello!");

function processnode(nnodeid)
{

//alert (nnodeid);

 if (document.getElementById(nnodeid).style.display == "none")
   {
    document.getElementById(nnodeid).style.display = ""
   }
 else
   {
    document.getElementById(nnodeid).style.display = "none"
   }
}

</script>
</head>
<body>

<h1> my notes   </h1>

<table border="1" width="85%">
<tr>
<td>

<xsl:for-each select="notes/section">

<!--
<xsl:variable name ="s_num" select="position()"></xsl:variable>
<b> section position = </b><xsl:value-of select="$s_num"/> 
-->
<!--
<xsl:variable name="T" select="concat(//text[1],' - ',//text[2],' - ',//text[3])"/>
          <xsl:value-of select="$T"/>
-->

<p>
node <xsl:number/>
_<b><xsl:value-of select="name(.)"/>_
<a href='javascript:processnode("section_{position()}")'><xsl:value-of select="@title"/></a></b>
</p>

<div style='display: visible; background-color: lightblue;' id='section_{position()}'>

<xsl:for-each select="note">
  <xsl:variable name="n1" select="concat('note_',../@title,position())"/>

<!-- note_link -->
 ---> 
  <a href='javascript:processnode("{$n1}")'>node <xsl:number/>.<xsl:value-of select="@title"/></a><br/>

  <div style='display: visible; background-color: white; border-style:double; border-color:black;  padding:4mm;' id='{$n1}'>
      <p><xsl:value-of select="a" /></p>

          <pre><xsl:value-of select="."/></pre>
  </div>
</xsl:for-each>

</div>
</xsl:for-each>

</td>
</tr>
</table>

</body>
</html>
</xsl:template>

</xsl:stylesheet>





































